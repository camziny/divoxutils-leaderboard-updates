#!/bin/bash

cd /Users/cameronziny/Desktop/other-projects/divoxutils-leaderboard-updates

TODAY=$(date +%Y-%m-%d)
YESTERDAY=$(date -v-1d +%Y-%m-%d)

echo "🔍 DivoxUtils Health Check - $(date)"
echo "=================================="

echo "✅ PM2 Status:"
npx pm2 status divoxutils-automation

echo ""
echo "💓 Heartbeat Check (last 2 hours):"
tail -20 logs/out-0.log | grep -i heartbeat | tail -2

echo ""
echo "📅 Recent Job Activity:"
if [ -f "logs/daily-herald-${TODAY}.log" ]; then
    echo "✅ Today's herald log exists: $(wc -l < logs/daily-herald-${TODAY}.log) lines"
else
    echo "❌ No herald log for today (${TODAY})"
fi

if [ -f "logs/daily-herald-${YESTERDAY}.log" ]; then
    echo "✅ Yesterday's herald log exists: $(wc -l < logs/daily-herald-${YESTERDAY}.log) lines"
else
    echo "⚠️  No herald log for yesterday (${YESTERDAY})"
fi

echo ""
echo "🔄 PM2 Restart Log:"
if [ -f "logs/pm2-restart.log" ]; then
    tail -5 logs/pm2-restart.log
else
    echo "No PM2 restart log yet"
fi

echo ""
echo "==================================" 