using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VKirienko.Web.Migrations;

public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        ArgumentNullException.ThrowIfNull(migrationBuilder);

        migrationBuilder.CreateTable(
            name: "SensorTelemetry",
            columns: table => new
            {
                SensorTelemetryId = table.Column<int>(nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                Date = table.Column<DateTime>(nullable: false),
                Temperature = table.Column<decimal>(nullable: false),
                Humidity = table.Column<decimal>(nullable: false),
                Pressure = table.Column<decimal>(nullable: false),
                Tvoc = table.Column<decimal>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_SensorTelemetry", x => x.SensorTelemetryId);
            });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        ArgumentNullException.ThrowIfNull(migrationBuilder);

        migrationBuilder.DropTable(
            name: "SensorTelemetry");
    }
}
