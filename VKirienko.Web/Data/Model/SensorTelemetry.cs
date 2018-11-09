using System;
using System.ComponentModel.DataAnnotations;

namespace VKirienko.Web.Data.Model
{
    public class SensorTelemetry
    {
        [Key]
        public int SensorTelemetryId { get; set; }
        public DateTime Date { get; set; }
        public decimal Temperature { get; set; }
        public decimal Humidity { get; set; }
        public decimal Pressure { get; set; }
        public decimal Tvoc { get; set; }
    }
}
