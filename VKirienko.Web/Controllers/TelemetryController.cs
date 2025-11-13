using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VKirienko.Web.Data.Model;
using VKirienko.Web.Services;
using VKirienko.Web.SignalR;
using VKirienko.Web.ViewModel;

namespace VKirienko.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TelemetryController : ControllerBase
{
    private static Gm10ViewModel _gm10ViewModel;

    private readonly ITelemetryService _telemetryService;
    private readonly IMapper _mapper;
    private readonly IHubContext<TelemetryHub> _hub;

#if DEBUG
    private readonly TimerManager _timer;
#endif

    public TelemetryController(
        ITelemetryService telemetryService,
        IMapper mapper,
        IHubContext<TelemetryHub> hub
#if DEBUG
        ,TimerManager timer
#endif      
        )
    {
        _telemetryService = telemetryService;
        _mapper = mapper;
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

        MergeWithGm10ViewModel();

        await _telemetryService.AddTelemetryAsync(telemetry);

        var sensorTelemetryViewModel = _mapper.Map<SensorTelemetryViewModel>(telemetry);
        await SendLastTelemetry(sensorTelemetryViewModel);

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

    #region Private methods

    private Task SendLastTelemetry(SensorTelemetryViewModel telemetry)
    {
        return _hub.Clients.All.SendAsync("LastTelemetry", telemetry);
    }

    #endregion
}
