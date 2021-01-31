using Microsoft.EntityFrameworkCore;
using VKirienko.Web.Data.Model;

namespace VKirienko.Web.Data
{
    public class IoTContext : DbContext
    {
        public DbSet<SensorTelemetry> SensorTelemetry { get; set; }

        public IoTContext()
        {
        }

        public IoTContext(DbContextOptions<IoTContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SensorTelemetry>()
                .HasKey(c => c.SensorTelemetryId);
        }
    }
}
