using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Quartz;
using VKirienko.Web.Data;
using VKirienko.Web.Jobs;
using VKirienko.Web.Services;
using VKirienko.Web.Settings;
using VKirienko.Web.SignalR;

namespace VKirienko.Web;

public class Startup(IConfiguration configuration)
{
    public IConfiguration Configuration { get; } = configuration;

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        var settings = Configuration.GetSection("Settings").Get<ApplicationSettings>();

        services.AddSingleton(settings);

        services.AddApplicationInsightsTelemetry();
        services.AddMvc();
        services.AddControllersWithViews();
        services.AddRazorPages();
        services.AddSignalR();
        services.AddHybridCache();

        services.AddHttpClient("GmcMapClient", httpClient =>
        {
            httpClient.BaseAddress = settings.GmcMap.Url;
        });

        services.AddQuartz(q =>
        {
            var jobKey = new JobKey("GmcTrackerJob");
            q.AddJob<GmcTrackerJob>(opts => opts.WithIdentity(jobKey));

            q.AddTrigger(opts => opts
                .ForJob(jobKey)
                .WithIdentity("GmcTrackerJob-trigger")
                //run every 1 minutes
                .WithCronSchedule("0 0/1 * * * ?")
                .StartNow()
            );
        });
        
        services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);

        services.AddAutoMapper(cfg => { }, typeof(Startup));

#if DEBUG
        services.AddSingleton<TimerManager>();
#endif

        services.AddScoped<IGmcDataProvicer, GmcDataProvicer>();
        services.AddScoped<ITelemetryService, TelemetryService>();

        services.AddDbContext<IoTContext>(options =>
            options.UseSqlite(Configuration.GetConnectionString("IoTDatabase")));
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Error");
        }

        app.UseForwardedHeaders(new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
        });

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
            endpoints.MapHub<TelemetryHub>("/telemetry");
            endpoints.MapFallbackToFile("index.html");
        });
    }
}
