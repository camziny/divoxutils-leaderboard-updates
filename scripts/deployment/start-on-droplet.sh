#!/bin/bash

DROPLET_IP="104.131.1.10"
DROPLET_USER="root"

echo "🚀 Starting automation agent on droplet..."

ssh $DROPLET_USER@$DROPLET_IP << 'EOF'
cd /opt/divoxutils-automation

# Stop any existing PM2 process
pm2 delete divoxutils-automation 2>/dev/null || true

# Create .env file with production values
cat > .env << 'ENVFILE'
API_BASE_URL=https://divoxutils.com
CRON_SECRET=7WEVEd3Yc03vUgg3nZfH
RETRY_LIMIT=3
BACKOFF_BASE_DELAY=5000
BATCH_DELAY=1500
ENVFILE

# Start PM2 with the ecosystem config
pm2 start ecosystem.config.cjs

# Save PM2 configuration
pm2 save

# Show status
pm2 status
pm2 logs divoxutils-automation --lines 10 --nostream

echo "✅ Automation agent started successfully!"
echo "📝 View logs: pm2 logs divoxutils-automation"
echo "📊 Check status: pm2 status"
EOF 