using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace VKirienko.Web;

public static class Program
{
    public static void Main(string[] args)
    {
        CreateWebHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateWebHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.ConfigureAppConfiguration((hostingContext, config) =>
                {
                    var env = hostingContext.HostingEnvironment;
                    config.AddJsonFile($"appsettings.secrets.{env.EnvironmentName}.json", true, true);
                });

                webBuilder.UseStartup<Startup>();
                webBuilder.CaptureStartupErrors(true);

#if DEBUG
                webBuilder.UseSetting("detailedErrors", "true");
#endif
            });
}


