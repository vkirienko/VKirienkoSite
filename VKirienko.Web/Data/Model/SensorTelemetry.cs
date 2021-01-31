using System;

namespace VKirienko.Web.Data.Model
{
    public class SensorTelemetry
    {
        public int SensorTelemetryId { get; set; }
        public DateTime Date { get; set; }
        public double Temperature { get; set; }
        public double Humidity { get; set; }
        public double Pressure { get; set; }
        public double Tvoc { get; set; }
        public double Radiation { get; set; }
    }
}
