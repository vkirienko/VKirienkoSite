using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VKirienko.Web.Data;
using VKirienko.Web.Data.Model;
using VKirienko.Web.ViewModel;

namespace VKirienko.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TelemetryController : ControllerBase
    {
        private static Gm10ViewModel _gm10ViewModel;

        private readonly IMapper _mapper;
        private readonly IoTContext _context;

        public TelemetryController(IoTContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Telemetry
        [HttpGet("")]
        public SensorTelemetryViewModel Get()
        {
            var maxDate = _context.SensorTelemetry.Max(t => t.Date);
            var telemetry = _context.SensorTelemetry.First(t => t.Date == maxDate);
            telemetry.Date = telemetry.Date.ToLocalTime();
            return _mapper.Map<SensorTelemetryViewModel>(telemetry);
        }


        // GET: api/Telemetry
        [HttpGet("{days}/{samples}")]
        public IEnumerable<SensorTelemetryViewModel> Get(int days, int samples)
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

                telemetry.Add(new SensorTelemetryViewModel {
                    Date = sampleDate,
                    Temperature = Average(window, d => d.Temperature),
                    Humidity = Average(window, d => d.Humidity),
                    Pressure = Average(window, d => d.Pressure),
                    Tvoc = Average(window, d => d.Tvoc),
                    Radiation = Average(window, d => d.Radiation)
                });
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
        }

        // POST: api/Telemetry/bme680
        [HttpPost("bme680")]
        public async Task<IActionResult> PostBme680Telemetry([FromBody] Bme680ViewModel model)
        {
            var telemetry = _mapper.Map<SensorTelemetry>(model, opt => {
                opt.AfterMap((src, dest) => { 
                    dest.Date = DateTime.UtcNow;
                });
            });

            MergeWithGm10ViewModel();

            _context.SensorTelemetry.Add(telemetry);
            
            await _context.SaveChangesAsync();
            
            return Ok();

            void MergeWithGm10ViewModel()
            {
                telemetry.Radiation = _gm10ViewModel?.Radiation ?? 0;

                _gm10ViewModel = null;
            }
        }

        // POST: api/Telemetry/gm10
        [HttpPost("gm10")]
        public IActionResult PostGm10Telemetry([FromBody] Gm10ViewModel model)
        {
            _gm10ViewModel = model;
            return Ok();
        }
    }
}
