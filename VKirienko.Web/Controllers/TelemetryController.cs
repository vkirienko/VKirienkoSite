using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Hybrid;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VKirienko.Web.Core;
using VKirienko.Web.Data.Model;
using VKirienko.Web.Services;
using VKirienko.Web.SignalR;
using VKirienko.Web.ViewModel;

namespace VKirienko.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TelemetryController : ControllerBase
{
    private readonly ITelemetryService _telemetryService;
    private readonly IMapper _mapper;
    private readonly HybridCache _cache;
    private readonly IHubContext<TelemetryHub> _hub;

#if DEBUG
    private readonly TimerManager _timer;
#endif

    public TelemetryController(
        ITelemetryService telemetryService,
        IMapper mapper,
        HybridCache cache,
        IHubContext<TelemetryHub> hub
#if DEBUG
        ,TimerManager timer
#endif      
        )
    {
        _telemetryService = telemetryService;
        _mapper = mapper;
        _cache = cache;
        _hub = hub;
#if DEBUG
        _timer = timer;
#endif      
    }

    // GET: api/Telemetry
    [HttpGet("")]
    public SensorTelemetryViewModel Get()
    {
        var telemetry = _telemetryService.GetLastTelemetry();

#if DEBUG
        if (!_timer.IsTimerStarted)
            _timer.PrepareTimer(() => SendLastTelemetry(telemetry));
#endif      

        return telemetry;
    }

    // GET: api/Telemetry
    [HttpGet("{days}/{samples}")]
    public IEnumerable<SensorTelemetryViewModel> Get(int days, int samples)
    {
        return _telemetryService.GetTelemetry(days, samples);        
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

        await MergeWithGm10ViewModel();

        await _telemetryService.AddTelemetryAsync(telemetry);

        var sensorTelemetryViewModel = _mapper.Map<SensorTelemetryViewModel>(telemetry);
        await SendLastTelemetry(sensorTelemetryViewModel);

        return Ok();

        async Task MergeWithGm10ViewModel()
        {
            var gm10Model = await _cache.GetOrCreateAsync<Gm10ReadingViewModel>(Constants.Gm10CacheKey, async (entry) => null);
            var gmc500Model = await _cache.GetOrCreateAsync<Gmc500ReadingViewModel>(Constants.Gmc500CacheKey, async (entry) => null);

            telemetry.RadiationGm10 = gm10Model?.CPM ?? 0;
            telemetry.RadiationGmc500 = gmc500Model?.CPM ?? 0;

            gm10Model = null;
            gmc500Model = null;

            await _cache.SetAsync(Constants.Gm10CacheKey, gm10Model);
            await _cache.SetAsync(Constants.Gmc500CacheKey, gmc500Model);
        }
    }

    // POST: api/Telemetry/gm10
    [HttpPost("gm10")]
    public async Task<IActionResult> PostGm10Telemetry([FromBody] Gm10ReadingViewModel model)
    {
        await _cache.SetAsync(Constants.Gm10CacheKey, model);
        return Ok();
    }

    #region Private methods

    private Task SendLastTelemetry(SensorTelemetryViewModel telemetry)
    {
        return _hub.Clients.All.SendAsync("LastTelemetry", telemetry);
    }

    #endregion
}
