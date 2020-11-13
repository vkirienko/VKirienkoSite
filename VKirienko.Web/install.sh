#!/bin/bash

echo "Setting execute permission to VKirienko.Web ..."
chmod +x /home/vlad/web/publish/VKirienko.Web

echo "Restarting vkirienko-web ..."
systemctl restart vkirienko-web.service

echo "Restarting nginx ..."
systemctl restart nginx

