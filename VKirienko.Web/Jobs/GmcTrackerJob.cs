using Microsoft.Extensions.Caching.Hybrid;
using Quartz;
using System;
using System.Threading.Tasks;
using VKirienko.Web.Core;
using VKirienko.Web.Services;

namespace VKirienko.Web.Jobs;

public class GmcTrackerJob : IJob
{
    private readonly IGmcDataProvicer _gmcDataProvicer;
    private readonly HybridCache _cache;

    public GmcTrackerJob(
        IGmcDataProvicer gmcDataProvicer,
        HybridCache cache)
    {
        _gmcDataProvicer = gmcDataProvicer;
        _cache = cache;
    }   

    public async Task Execute(IJobExecutionContext context)
    {
        try
        {
            var model = await _gmcDataProvicer.LoadGmcDataAsync();

            await _cache.SetAsync(Constants.Gmc500CacheKey, model);
        }
        catch (Exception ex)
        {
            await Task.FromException(ex);
        }
    }
}