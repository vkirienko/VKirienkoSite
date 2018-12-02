using System;

namespace VKirienko.Web.ViewModel
{
    public class SensorTelemetryViewModel
    {
        public DateTime Date { get; set; }
        public decimal Temperature { get; set; }
        public decimal Humidity { get; set; }
        public decimal Pressure { get; set; }
        public decimal Tvoc { get; set; }
    }
}
