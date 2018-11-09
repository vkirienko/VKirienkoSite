using AutoMapper;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using VKirienko.Web.Data;
using VKirienko.Web.Data.Model;
using VKirienko.Web.ViewModel;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace VKirienko.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TelemetryController : ControllerBase
    {
        private readonly IMapper _mapper;

        public TelemetryController(IMapper mapper)
        {
            _mapper = mapper;
        }

        // GET: api/Telemetry
        [HttpGet]
        public async Task<IEnumerable<SensorTelemetryViewModel>> Get()
        {
            using (var db = new IoTContext())
            {
                return await db.SensorTelemetry.Select(t => _mapper.Map<SensorTelemetryViewModel>(t)).ToListAsync();
            }
        }

        // POST: api/Telemetry
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SensorTelemetryViewModel telemetry)
        {
            using (var db = new IoTContext())
            {
                db.SensorTelemetry.Add(_mapper.Map<SensorTelemetry>(telemetry));
                await db.SaveChangesAsync();
            }

            return Ok();
        }
    }
}
