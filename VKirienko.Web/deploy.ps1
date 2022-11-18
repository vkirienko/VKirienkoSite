& cmd /c rmdir bin /s /q
& cmd /c rmdir obj /s /q

& dotnet publish -c Release -r linux-arm --sc


$googleMapsApiKey = (Get-Content -path ..\..\Raspberry\google\GoogleMapsApiKey.txt -Raw)

Write-Host ""
Write-Host $googleMapsApiKey

Get-ChildItem '.\bin\Release\net7.0\linux-arm\publish\ClientApp\dist\*.html' -Recurse | ForEach {
	Write-Host $_

	$content = [System.IO.File]::ReadAllText($_).Replace("YOUR_GOOGLE_MAPS_API_KEY", $googleMapsApiKey)
	[System.IO.File]::WriteAllText($_, $content)
}


$appInsightsConnectionString = (Get-Content -path ..\..\Raspberry\app-secrets\appinsights.release.txt -Raw)

Write-Host ""
Write-Host $appInsightsConnectionString

Get-ChildItem '.\bin\Release\net7.0\linux-arm\publish\ClientApp\dist\*.js' -Recurse | ForEach {
	Write-Host $_

	$content = [System.IO.File]::ReadAllText($_).Replace("YOUR_APP_INSIGHTS_CONNECTION_STRING", $appInsightsConnectionString)

	[System.IO.File]::WriteAllText($_, $content)
}
