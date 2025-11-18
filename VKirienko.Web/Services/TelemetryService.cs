using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VKirienko.Web.Data;
using VKirienko.Web.Data.Model;
using VKirienko.Web.ViewModel;

namespace VKirienko.Web.Services;

public class TelemetryService(
    IoTContext context,
    IMapper mapper) : ITelemetryService
{
    private readonly IoTContext _context = context;
    private readonly IMapper _mapper = mapper;

    public async Task<int> AddTelemetryAsync(SensorTelemetry telemetry)
    {
        await _context.SensorTelemetry.AddAsync(telemetry);
        return await _context.SaveChangesAsync();
    }


    public SensorTelemetryViewModel GetLastTelemetry()
    {
        var maxDate = _context.SensorTelemetry.Max(t => t.Date);
        var telemetry = _context.SensorTelemetry.First(t => t.Date == maxDate);
        telemetry.Date = telemetry.Date.ToLocalTime();
        return _mapper.Map<SensorTelemetryViewModel>(telemetry);
    }

    public IEnumerable<SensorTelemetryViewModel> GetTelemetry(int days, int samples)
    {
        var today = DateTime.UtcNow;
        var startDate = today.AddDays(-days);

        var sampleSize = Math.Round((today - startDate).TotalMinutes / samples);

        var rawTelemetry = _context.SensorTelemetry
            .Where(t => t.Date >= startDate)
            .ToList();

        var telemetry = new List<SensorTelemetryViewModel>();

        for (int i = 0; i < samples; i++)
        {
            var window = rawTelemetry.Where(t =>
                (t.Date - startDate).TotalMinutes >= i * sampleSize &&
                (t.Date - startDate).TotalMinutes < (i + 1) * sampleSize);

            var sampleDate = today.AddMinutes(-(samples - i) * sampleSize).ToLocalTime();

            telemetry.Add(new SensorTelemetryViewModel
            {
                Date = sampleDate,
                Temperature = Average(window, d => d.Temperature),
                Humidity = Average(window, d => d.Humidity),
                Pressure = Average(window, d => d.Pressure),
                Tvoc = Average(window, d => d.Tvoc),
                RadiationGm10 = Average(window, d => d.RadiationGm10),
                RadiationGmc500 = Average(window, d => d.RadiationGmc500)
            });

            /*
            telemetry.Add(new SensorTelemetryViewModel
            {
                Date = sampleDate,
                Temperature = Median(window, d => d.Temperature),
                Humidity = Median(window, d => d.Humidity),
                Pressure = Median(window, d => d.Pressure),
                Tvoc = Median(window, d => d.Tvoc),
                RadiationGm10 = Median(window, d => d.RadiationGm10),
                RadiationGmc500 = Median(window, d => d.RadiationGmc500)
            });
            */
        }

        return telemetry;

        double? Average(IEnumerable<SensorTelemetry> data, Func<SensorTelemetry, double> selector)
        {
            if (!data.Any())
                return null;

            data = data.Where(d => selector(d) != 0);
            if (!data.Any())
                return null;

            return data.Average(d => selector(d));
        }

        /*
        double? Median(IEnumerable<SensorTelemetry> data, Func<SensorTelemetry, double> selector)
        {
            if (!data.Any())
                return null;

            data = data.Where(d => selector(d) != 0);
            if (!data.Any())
                return null;

            return data.Select(d => selector(d)).Median();
        }
        */
    }
}
