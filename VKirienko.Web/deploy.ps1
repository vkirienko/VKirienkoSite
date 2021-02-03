& cmd /c rmdir bin /s /q
& cmd /c rmdir obj /s /q

& dotnet publish -c Release -r linux-arm

$key = (Get-Content -path ..\..\Raspberry\google\GoogleMapsApiKey.txt -Raw)

Write-Host $key

Get-ChildItem '.\bin\Release\net5.0\linux-arm\publish\ClientApp\dist\*.js' -Recurse | ForEach {
	Write-Host $_

	$content = [System.IO.File]::ReadAllText($_).Replace("YOUR_GOOGLE_MAPS_API_KEY", $key)
	[System.IO.File]::WriteAllText($_, $content)
}

Get-ChildItem '.\bin\Release\net5.0\linux-arm\publish\ClientApp\dist\*.html' -Recurse | ForEach {
	Write-Host $_

	$content = [System.IO.File]::ReadAllText($_).Replace("YOUR_GOOGLE_MAPS_API_KEY", $key)
	[System.IO.File]::WriteAllText($_, $content)
}
