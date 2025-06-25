#!/bin/bash

DROPLET_IP="104.131.1.10"
DROPLET_USER="root"

echo "🔍 Checking automation agent status on droplet..."

ssh $DROPLET_USER@$DROPLET_IP << 'EOF'
echo "📊 PM2 Status:"
pm2 status divoxutils-automation

echo ""
echo "📝 Recent logs:"
pm2 logs divoxutils-automation --lines 5 --nostream

echo ""
echo "💾 Memory usage:"
free -h | grep -E "^Mem|^Swap"

echo ""
echo "🕐 Current time on droplet:"
date
EOF 