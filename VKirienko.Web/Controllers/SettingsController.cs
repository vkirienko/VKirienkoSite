using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VKirienko.Web.Settings;

namespace VKirienko.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController(ApplicationSettings settings) : ControllerBase
    {
        private readonly ApplicationSettings _settings = settings;

        // GET: api/Settings
        [HttpGet("")]
        public ApplicationSettings Get()
        {
            return _settings;
        }
    }
}
