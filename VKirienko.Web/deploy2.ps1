
$session = New-PSSession -HostName 10.44.33.59 -UserName vlad

#Enter-PSSession -HostName 10.44.33.59 -UserName vlad

#Remove-Item /home/vlad/web/publish/*.* -Recurse -Verbose

Copy-Item ".\bin\Release\net5.0\linux-arm\publish" -Destination "/home/vlad/web" -Force -Recurse -Verbose -ToSession $session 

#Invoke-Command -Session $session -ScriptBlock { & bash -c "$(wget -q -O - https://raw.githubusercontent.com/vkirienko/VKirienkoSite/master/VKirienko.Web/install.sh)"} -Verbose

#Invoke-Command -HostName vlad@10.44.33.59 -ScriptBlock { sudo bash -c "$(wget -q -O - https://raw.githubusercontent.com/vkirienko/VKirienkoSite/master/VKirienko.Web/install.sh }