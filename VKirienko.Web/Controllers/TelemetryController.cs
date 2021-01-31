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

            return _context.SensorTelemetry
                .Where(t => t.Date >= startDate)
                .ToList()
                .GroupBy(g => Math.Round((today - g.Date).TotalMinutes / sampleSize))
                .Select(g => new SensorTelemetryViewModel
                {
                    Date = today.AddMinutes(-g.Key * sampleSize).ToLocalTime(),
                    Temperature = g.Average(s => s.Temperature),
                    Humidity = g.Average(s => s.Humidity),
                    Pressure = g.Average(s => s.Pressure),
                    Tvoc = g.Average(s => s.Tvoc),
                    Radiation = g.Average(s => s.Radiation)
                })
                .ToList();
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
