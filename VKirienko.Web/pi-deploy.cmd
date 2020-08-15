@echo off
rem Deployment steps:
rem 
rem 1. Run pi-deploy.cmd
rem
rem 2. Replace YOUR_GOOGLE_MAPS_API_KEY with real key in main.xxxxxxxxx.js file
rem    ((Get-Content -path .\bin\Release\netcoreapp3.1\linux-arm\publish\main.*.js -Raw) -replace 'YOUR_GOOGLE_MAPS_API_KEY','real key' | Set-Content -Path .\bin\Release\netcoreapp3.1\linux-arm\publish\main.*.js)
rem
rem 3. Delete folder /home/pi/vkirienko/publish
rem
rem 4. Copy \bin\Release\netcoreapp3.1\linux-arm\publish\ to PI /home/pi/vkirienko/publish (make sure FileZilla 
rem    transfers all files including files without extensions as binary files)
rem
rem 5. sudo chmod +x /home/pi/vkirienko/publish/VKirienko.Web
rem
rem 6. sudo systemctl restart vkirienko-web.service
rem
rem 7. sudo systemctl restart nginx
rem

rmdir bin /s /q
rmdir obj /s /q

dotnet publish -c Release -r linux-arm