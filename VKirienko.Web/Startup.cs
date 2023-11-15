using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using VKirienko.Web.Data;
using VKirienko.Web.Services;
using VKirienko.Web.Settings;
using VKirienko.Web.SignalR;

namespace VKirienko.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

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

            services.AddAutoMapper(typeof(Startup));

#if DEBUG
            services.AddSingleton<TimerManager>();
#endif
            services.AddScoped<ITelemetryService, TelemetryService>();

            services.AddDbContext<IoTContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("IoTDatabase")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationSettings settings)
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
}
