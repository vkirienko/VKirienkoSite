using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        [HttpGet]
        public async Task<IEnumerable<SensorTelemetryViewModel>> Get()
        {
            return await _context.SensorTelemetry.Select(t => _mapper.Map<SensorTelemetryViewModel>(t)).ToListAsync();
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
