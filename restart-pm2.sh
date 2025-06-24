#!/bin/bash

cd /Users/cameronziny/Desktop/other-projects/divoxutils-leaderboard-updates

echo "$(date): Daily PM2 restart initiated" >> logs/pm2-restart.log

npx pm2 restart divoxutils-automation

if [ $? -eq 0 ]; then
    echo "$(date): PM2 restart successful" >> logs/pm2-restart.log
else
    echo "$(date): PM2 restart failed" >> logs/pm2-restart.log
fi

echo "$(date): PM2 status after restart:" >> logs/pm2-restart.log
npx pm2 status >> logs/pm2-restart.log
echo "---" >> logs/pm2-restart.log 