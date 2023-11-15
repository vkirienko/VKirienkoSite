@echo off

rem Deployment steps:
rem 
rem 1. Run pi-deploy.cmd
rem
rem 2. Delete folder /home/vlad/web/publish on RPi 
rem
rem 3. Copy \bin\Release\net8.0\linux-arm\publish\ to RPi /home/vlad/web/publish 
rem    (make sure FileZilla transfers all files including files without extensions as binary files)
rem
rem 4. sudo bash -c "$(wget -q -O - https://raw.githubusercontent.com/vkirienko/VKirienkoSite/master/VKirienko.Web/install.sh)"
rem

powershell.exe -f deploy.ps1 