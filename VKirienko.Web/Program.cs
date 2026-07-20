using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
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
                // Configure Kestrel to enable HTTP/3 (QUIC). HTTP/3 requires an HTTPS listener.
                //webBuilder.ConfigureKestrel(serverOptions =>
                //{
                //    // Default endpoint protocols include HTTP/1 and HTTP/2; add HTTP/3 where supported.
                //    serverOptions.ConfigureEndpointDefaults(listenOptions =>
                //    {
                //        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
                //    });
                //
                //    // Ensure HTTPS listener is present (HTTP/3 requires TLS). Use the default cert (development cert
                //    // or configured certificate). Adjust as needed for production certificates.
                //    serverOptions.ListenAnyIP(4200, listenOptions =>
                //    {
                //        listenOptions.UseHttps();
                //        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
                //    });
                //
                //    // Do not configure a plain HTTP listener here: HTTPS-only configuration.
                //    // If you need HTTP->HTTPS redirection at the server level, add a port 80 listener
                //    // and keep UseHttpsRedirection in Startup. For security, this app is configured
                //    // to only listen on HTTPS (port 443) from Kestrel's side.
                //});

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


