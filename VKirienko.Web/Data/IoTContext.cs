using Microsoft.EntityFrameworkCore;
using VKirienko.Web.Data.Model;

namespace VKirienko.Web.Data
{
    public class IoTContext : DbContext
    {
        public DbSet<SensorTelemetry> SensorTelemetry { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=../../Databases/IoT.db");
        }
    }
}
