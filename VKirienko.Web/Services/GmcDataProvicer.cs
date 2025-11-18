using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using VKirienko.Web.Core;
using VKirienko.Web.Settings;
using VKirienko.Web.ViewModel;

namespace VKirienko.Web.Services;

public class GmcDataProvicer : IGmcDataProvicer
{
    private readonly ApplicationSettings _settings;
    private readonly IHttpClientFactory _httpClientFactory;

    private static readonly JsonSerializerOptions _options = new ()
    {
        PropertyNameCaseInsensitive = true,
        Converters = {
            new DoubleConverter()
        }
    };

    public GmcDataProvicer(
        ApplicationSettings settings,
        IHttpClientFactory httpClientFactory)
    {
        _settings = settings;
        _httpClientFactory = httpClientFactory;
    }

    public async Task<Gmc500ReadingViewModel> LoadGmcDataAsync()
    {
        var client = _httpClientFactory.CreateClient("GmcMapClient");
        var url = $"?Param_ID={_settings.GmcMap.DeviceId}";
        var response = await client.GetAsync(url);
        
        response.EnsureSuccessStatusCode();

        var responseString = await response.Content.ReadAsStringAsync();

        var model = JsonSerializer.Deserialize<Gmc500ReadingViewModel[]>(responseString, _options);
        return model[0];
    }
}
