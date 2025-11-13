using AutoMapper;
using VKirienko.Web.Data.Model;
using VKirienko.Web.ViewModel;

namespace VKirienko.Web.Profiles;

public class SensorTelemetryProfile : Profile
{
    public SensorTelemetryProfile()
    {
        CreateMap<Bme680ViewModel, SensorTelemetry>();
        CreateMap<SensorTelemetry, SensorTelemetryViewModel>().ReverseMap();
    }
}
