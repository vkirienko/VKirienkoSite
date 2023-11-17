#!/bin/bash

set -e
trap 'echo ERROR on line number $LINENO' ERR

echo "Setting execute permission to VKirienko.Web ..."
chmod +x /home/vlad/web/publish/VKirienko.Web

echo "Deploying vkirienko-web service ..."
systemctl stop nginx
systemctl stop vkirienko-web.service

wget -O /tmp/vkirienko-web.service https://raw.githubusercontent.com/vkirienko/VKirienkoSite/master/install/vkirienko-web.service
cp /tmp/vkirienko-web.service /etc/systemd/system

echo "Starting web site service ..."
systemctl daemon-reload
systemctl start vkirienko-web.service

echo "Starting nginx ..."
systemctl start nginx

