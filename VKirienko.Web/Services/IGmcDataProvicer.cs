using System.Threading.Tasks;
using VKirienko.Web.ViewModel;

namespace VKirienko.Web.Services;

public interface IGmcDataProvicer
{
    Task<Gmc500ReadingViewModel> LoadGmcDataAsync();
}
