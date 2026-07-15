using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using VKirienko.Web.Settings;
using VKirienko.Web.ViewModel;

namespace VKirienko.Web.Services;

public partial class GmcDataProvicer : IGmcDataProvicer
{
    private readonly ApplicationSettings _settings;
    private readonly IHttpClientFactory _httpClientFactory;

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
        var url = $"?Param_ID={_settings.GmcMap.DeviceId}&systemTimeZone=-5";
        var response = await client.GetAsync(url);
        
        response.EnsureSuccessStatusCode();

        var responseString = await response.Content.ReadAsStringAsync();

        // If response contains HTML table, try to parse it with HtmlAgilityPack.
        var doc = new HtmlDocument();
        doc.LoadHtml(responseString);

        var tables = doc.DocumentNode.SelectNodes("//table") ?? throw new InvalidOperationException("Unable to parse GMC response: unknown format.");

        foreach (var table in tables)
        {
            var rows = table.SelectNodes(".//tr");
            if (rows == null || rows.Count == 0) 
                continue;

            // find header row index
            int headerIndex = -1;
            for (int i = 0; i < rows.Count; i++)
            {
                var row = rows[i];
                var headerCells = row.SelectNodes(".//th");
                if (headerCells != null && headerCells.Count > 0)
                {
                    headerIndex = i;
                    break;
                }

                // fallback: detect header by content
                var text = row.InnerText?.ToLowerInvariant() ?? string.Empty;
                if (text.Contains("date") && text.Contains("cpm") && text.Contains("acpm"))
                {
                    headerIndex = i;
                    break;
                }
            }

            if (headerIndex < 0) 
                continue;

            var headerRow = rows[headerIndex];
            var headerCellsAll = headerRow.SelectNodes(".//th|.//td");
            if (headerCellsAll == null) 
                continue;

            var headers = new List<string>();
            foreach (var hc in headerCellsAll)
            {
                headers.Add(hc.InnerText?.Trim() ?? string.Empty);
            }

            int dateIdx = -1, cpmIdx = -1, acpmIdx = -1, usvIdx = -1;
            for (int i = 0; i < headers.Count; i++)
            {
                var h = headers[i].ToLowerInvariant().Replace(".", "").Replace(" ", "").Replace("/", "").Replace("μ", "u").Replace("µ", "u");
                if (h.Contains("date")) dateIdx = i;
                if (h.Contains("acpm")) acpmIdx = i;
                else if (h.Contains("cpm")) cpmIdx = i;
                if (h.Contains("usv")) usvIdx = i;
            }

            if (dateIdx < 0 || cpmIdx < 0 || acpmIdx < 0) 
                continue;

            // find first data row after header
            HtmlNode dataRow = null;
            for (int i = headerIndex + 1; i < rows.Count; i++)
            {
                var cells = rows[i].SelectNodes(".//th|.//td");
                if (cells == null) 
                    continue;
                if (cells.Count <= Math.Max(dateIdx, Math.Max(cpmIdx, acpmIdx))) 
                    continue;
                dataRow = rows[i];
                break;
            }

            if (dataRow == null) 
                continue;

            var dataCells = dataRow.SelectNodes(".//th|.//td");
            var extracted = new Gmc500ReadingViewModel
            {
                Time = dataCells[dateIdx].InnerText?.Trim()
            };

            var rawCpm = dataCells[cpmIdx].InnerText?.Trim() ?? string.Empty;
            if (double.TryParse(rawCpm, NumberStyles.Any, CultureInfo.InvariantCulture, out var cpmVal) ||
                double.TryParse(rawCpm, NumberStyles.Any, CultureInfo.CurrentCulture, out cpmVal))
            {
                extracted.CPM = cpmVal;
            }

            var rawAcpm = dataCells[acpmIdx].InnerText?.Trim() ?? string.Empty;
            if (double.TryParse(rawAcpm, NumberStyles.Any, CultureInfo.InvariantCulture, out var acpmVal) ||
                double.TryParse(rawAcpm, NumberStyles.Any, CultureInfo.CurrentCulture, out acpmVal))
            {
                extracted.ACPM = acpmVal;
            }

            // optional: uSv (microSievert per hour) column
            if (usvIdx >= 0 && usvIdx < dataCells.Count)
            {
                var rawUsv = dataCells[usvIdx].InnerText?.Trim() ?? string.Empty;
                // extract numeric portion (handles units like "uSv/h" or "µSv/h")
                var m = USvRegex().Match(rawUsv);
                if (m.Success)
                {
                    var num = m.Value.Replace(',', '.');
                    if (double.TryParse(num, NumberStyles.Any, CultureInfo.InvariantCulture, out var usvVal) ||
                        double.TryParse(num, NumberStyles.Any, CultureInfo.CurrentCulture, out usvVal))
                    {
                        extracted.USv = usvVal;
                    }
                }
            }

            return extracted;
        }

        throw new InvalidOperationException("Unable to parse GMC response: unknown format.");
    }

    [GeneratedRegex("[-+]?\\d+(?:[.,]\\d+)?(?:[eE][-+]?\\d+)?")]
    private static partial Regex USvRegex();
}
