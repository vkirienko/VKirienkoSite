using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace VKirienko.Web.Core;

public class DoubleConverter : JsonConverter<double>
{
    public override double Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        // If the JSON value is a number, just return it
        if (reader.TokenType == JsonTokenType.Number)
            return reader.GetDouble();

        // If it's a string, clean & parse it
        if (reader.TokenType == JsonTokenType.String)
        {
            var str = reader.GetString()?.Trim();

            if (string.IsNullOrWhiteSpace(str))
                return 0;

            if (double.TryParse(str, out double value))
                return value;

            return 0;
        }

        return 0;
    }

    public override void Write(Utf8JsonWriter writer, double value, JsonSerializerOptions options)
    {
        writer.WriteNumberValue(value);
    }
}
