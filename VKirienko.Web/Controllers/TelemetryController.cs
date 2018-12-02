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
        private readonly IMapper _mapper;
        private IoTContext _context;

        public TelemetryController(IoTContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Telemetry
        [HttpGet("{days}/{samples}")]
        public IEnumerable<SensorTelemetryViewModel> Get(int days, int samples)
        {
            var today = DateTime.Now;
            var startDate = today.AddDays(-days);

            var sampleSize = Math.Round((today - startDate).TotalMinutes / samples);

            return _context.SensorTelemetry
                .Where(t => t.Date >= startDate)
                .ToList()
                .GroupBy(g => Math.Round((today - g.Date).TotalMinutes / sampleSize))
                .Select(g => new SensorTelemetryViewModel
                {
                    Date = today.AddMinutes(-g.Key * sampleSize),
                    Temperature = g.Average(s => s.Temperature),
                    Humidity = g.Average(s => s.Humidity),
                    Pressure = g.Average(s => s.Pressure),
                    Tvoc = g.Average(s => s.Tvoc)
                })
                .ToList();
        }

        // POST: api/Telemetry
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SensorTelemetryViewModel telemetry)
        {
            _context.SensorTelemetry.Add(_mapper.Map<SensorTelemetry>(telemetry));
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
