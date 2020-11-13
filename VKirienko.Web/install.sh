#!/bin/bash

sudo chmod +x /home/vlad/web/publish/VKirienko.Web
sudo systemctl restart vkirienko-web.service
sudo systemctl restart nginx

