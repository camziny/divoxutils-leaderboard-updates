#!/bin/bash

# Deployment script for existing Digital Ocean droplet

DROPLET_IP="104.131.1.10"
DROPLET_USER="root"
APP_DIR="/opt/divoxutils-automation"

echo "🚀 Deploying to Digital Ocean Droplet..."

# Copy files to droplet
echo "📦 Copying files to droplet..."
ssh $DROPLET_USER@$DROPLET_IP "mkdir -p $APP_DIR"
rsync -avz --exclude='node_modules' --exclude='.git' --exclude='logs/*' --exclude='*.log' --exclude='.env' --exclude='*.plist' --exclude='check-health.sh' --exclude='force-daily-job.sh' --exclude='restart-pm2.sh' ./ $DROPLET_USER@$DROPLET_IP:$APP_DIR/

# Install dependencies and PM2 on droplet
echo "📦 Installing dependencies on droplet..."
ssh $DROPLET_USER@$DROPLET_IP << 'EOF'
cd /opt/divoxutils-automation
npm install --production
npm install -g pm2
pm2 startup systemd -u root --hp /root
EOF

echo "✅ Deployment complete!"
echo "Run 'bash start-on-droplet.sh' to start the service" 