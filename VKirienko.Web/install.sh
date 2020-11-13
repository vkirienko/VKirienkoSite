#!/bin/bash

set -e
trap 'echo ERROR on line number $LINENO' ERR

echo "Setting execute permission to VKirienko.Web ..."
chmod +x /home/vlad/web/publish/VKirienko.Web

echo "Deploying vkirienko-web service ..."
systemctl stop vkirienko-web.service

wget -O /tmp/vkirienko-web.service https://raw.githubusercontent.com/vkirienko/VKirienkoSite/master/VKirienko.Web/vkirienko-web.service
cp /tmp/vkirienko-web.service /etc/systemd/system

systemctl start vkirienko-web.service

echo "Restarting nginx ..."
systemctl restart nginx

