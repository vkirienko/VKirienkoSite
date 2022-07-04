using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VKirienko.Web.Settings;

namespace VKirienko.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ApplicationSettings _settings;

        public SettingsController(ApplicationSettings settings)
        {
            _settings = settings;
        }

        // GET: api/Settings
        [HttpGet("")]
        public ApplicationSettings Get()
        {
            return _settings;
        }
    }
}
