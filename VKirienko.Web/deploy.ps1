& dotnet publish -c Release -r linux-arm

((Get-Content -path .\bin\Release\netcoreapp3.1\linux-arm\publish\ClientApp\dist\main.*.js -Raw) -replace 'YOUR_GOOGLE_MAPS_API_KEY','real key' | Set-Content -Path .\bin\Release\netcoreapp3.1\linux-arm\publish\ClientApp\dist\main.*.js)