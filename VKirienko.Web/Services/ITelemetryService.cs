using System.Collections.Generic;
using System.Threading.Tasks;
using VKirienko.Web.Data.Model;
using VKirienko.Web.ViewModel;

namespace VKirienko.Web.Services
{
    public interface ITelemetryService
    {
        Task<int> AddTelemetryAsync(SensorTelemetry telemetry);

        SensorTelemetryViewModel GetLastTelemetry();
        IEnumerable<SensorTelemetryViewModel> GetTelemetry(int days, int samples);
    }
}
