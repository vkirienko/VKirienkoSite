using AspNetCore.Proxy;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using VKirienko.Web.Data;
using VKirienko.Web.Settings;

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

            services.AddMvc();
            services.AddControllersWithViews();
            services.AddRazorPages();
            
            services.AddProxies();
            services.AddAutoMapper(typeof(Startup));

            services.AddDbContext<IoTContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("IoTDatabase")));

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
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

            app.UseStaticFiles();
            app.UseRouting();
            app.UseSpaStaticFiles();

            app.UseProxies(proxies =>
            {
                proxies.Map("adsb/fa-stats", proxy => proxy.UseHttp($"{settings.FlightAware.Url}{settings.FlightAware.UserName}"));
                proxies.Map("adsb/fr24-stats", proxy => proxy.UseHttp($"{settings.FlightRadar24.Url}{settings.FlightRadar24.UserName}"));
                proxies.Map("adsb/rb-stats", proxy => proxy.UseHttp($"{settings.RadarBox.Url}{settings.RadarBox.UserName}"));
                proxies.Map("adsb/ae-stats", proxy => proxy.UseHttp($"{settings.AdsbExchange.Url}{settings.AdsbExchange.UserName}"));
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
