@echo off
rem Run this
rem Copy \bin\Release\netcoreapp3.1\linux-arm\publish\ to PI /home/pi/vkirienko/publish
rem Make sure FileZilla transfers all files including files without extensions as binary files

dotnet publish -c Release -r linux-arm