// This file is used by Code Analysis to maintain SuppressMessage
// attributes that are applied to this project.
// Project-level suppressions either have no target or are given
// a specific target and scoped to a namespace, type, member, etc.

using System.Diagnostics.CodeAnalysis;

[assembly: SuppressMessage("Reliability", "CA2007:Consider calling ConfigureAwait on the awaited task", Justification = "<Pending>", Scope = "member", Target = "~M:VKirienko.Web.Controllers.TelemetryController.PostBme680Telemetry(VKirienko.Web.ViewModel.Bme680ViewModel)~System.Threading.Tasks.Task{Microsoft.AspNetCore.Mvc.IActionResult}")]
[assembly: SuppressMessage("Design", "CA1062:Validate arguments of public methods", Justification = "<Pending>", Scope = "member", Target = "~M:VKirienko.Web.Data.IoTContext.OnModelCreating(Microsoft.EntityFrameworkCore.ModelBuilder)")]
[assembly: SuppressMessage("Reliability", "CA2007:Consider calling ConfigureAwait on the awaited task", Justification = "<Pending>", Scope = "member", Target = "~M:VKirienko.Web.Services.TelemetryService.AddTelemetryAsync(VKirienko.Web.Data.Model.SensorTelemetry)")]
[assembly: SuppressMessage("Reliability", "CA2007:Consider calling ConfigureAwait on the awaited task", Justification = "<Pending>", Scope = "member", Target = "~M:VKirienko.Web.Controllers.TelemetryController.PostGm10Telemetry(VKirienko.Web.ViewModel.Gm10ViewModel)~System.Threading.Tasks.Task{Microsoft.AspNetCore.Mvc.IActionResult}")]
[assembly: SuppressMessage("Reliability", "CA2007:Consider calling ConfigureAwait on the awaited task", Justification = "<Pending>", Scope = "member", Target = "~M:VKirienko.Web.Services.GmcDataProvicer.LoadGmcDataAsync~System.Threading.Tasks.Task{VKirienko.Web.ViewModel.Gmc500ViewModel}")]
[assembly: SuppressMessage("Usage", "CA2234:Pass system uri objects instead of strings", Justification = "<Pending>", Scope = "member", Target = "~M:VKirienko.Web.Services.GmcDataProvicer.LoadGmcDataAsync~System.Threading.Tasks.Task{VKirienko.Web.ViewModel.Gmc500ViewModel}")]
[assembly: SuppressMessage("Reliability", "CA2007:Consider calling ConfigureAwait on the awaited task", Justification = "<Pending>", Scope = "member", Target = "~M:VKirienko.Web.Jobs.GmcTrackerJob.Execute(Quartz.IJobExecutionContext)~System.Threading.Tasks.Task")]
[assembly: SuppressMessage("Design", "CA1031:Do not catch general exception types", Justification = "<Pending>", Scope = "member", Target = "~M:VKirienko.Web.Jobs.GmcTrackerJob.Execute(Quartz.IJobExecutionContext)~System.Threading.Tasks.Task")]
[assembly: SuppressMessage("Design", "CA1062:Validate arguments of public methods", Justification = "<Pending>", Scope = "member", Target = "~M:VKirienko.Web.Core.DoubleConverter.Write(System.Text.Json.Utf8JsonWriter,System.Double,System.Text.Json.JsonSerializerOptions)")]
[assembly: SuppressMessage("Reliability", "CA2007:Consider calling ConfigureAwait on the awaited task", Justification = "<Pending>", Scope = "member", Target = "~M:VKirienko.Web.Controllers.TelemetryController.PostGm10Telemetry(VKirienko.Web.ViewModel.Gm10ReadingViewModel)~System.Threading.Tasks.Task{Microsoft.AspNetCore.Mvc.IActionResult}")]
[assembly: SuppressMessage("Reliability", "CA2007:Consider calling ConfigureAwait on the awaited task", Justification = "<Pending>", Scope = "member", Target = "~M:VKirienko.Web.Services.GmcDataProvicer.LoadGmcDataAsync~System.Threading.Tasks.Task{VKirienko.Web.ViewModel.Gmc500ReadingViewModel}")]
[assembly: SuppressMessage("Usage", "CA2234:Pass system uri objects instead of strings", Justification = "<Pending>", Scope = "member", Target = "~M:VKirienko.Web.Services.GmcDataProvicer.LoadGmcDataAsync~System.Threading.Tasks.Task{VKirienko.Web.ViewModel.Gmc500ReadingViewModel}")]
