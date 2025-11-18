using System.Text.Json.Serialization;

namespace VKirienko.Web.ViewModel;

public class Gmc500ReadingViewModel
{
    public string Time { get; set; }
    public double CPM { get; set; }
    public double ACPM { get; set; }

    [JsonPropertyName("uSv")]
    public double USv { get; set; }

    [JsonPropertyName("pCi/L")]
    public string PcIL { get; set; }
}
