# Deployment Guide

## Deploying to Digital Ocean Droplet

### Prerequisites

- Digital Ocean droplet with Node.js installed
- SSH access to the droplet
- Git repository pushed to GitHub

### Quick Deploy

1. **Update droplet IP** in deployment scripts:

   ```bash
   # Edit scripts/deployment/deploy-to-droplet.sh
   # Update DROPLET_IP with your droplet's IP
   ```

2. **Deploy the application**:

   ```bash
   bash scripts/deployment/deploy-to-droplet.sh
   ```

3. **Start the service**:

   ```bash
   bash scripts/deployment/start-on-droplet.sh
   ```

4. **Verify deployment**:
   ```bash
   bash scripts/deployment/check-droplet-status.sh
   ```

### What Gets Deployed

- Application code to `/opt/divoxutils-automation`
- PM2 process manager configuration
- Environment variables from `.env` file
- Auto-start on system reboot

### Monitoring

Check status from your local machine:

```bash
bash scripts/deployment/check-droplet-status.sh
```

SSH to droplet for detailed logs:

```bash
ssh root@YOUR_DROPLET_IP
pm2 logs divoxutils-automation
```

### Updating the Application

1. Make changes locally
2. Commit and push to GitHub
3. Run deployment script again:
   ```bash
   bash scripts/deployment/deploy-to-droplet.sh
   bash scripts/deployment/start-on-droplet.sh
   ```

### Troubleshooting

**PM2 not starting:**

```bash
ssh root@YOUR_DROPLET_IP
pm2 kill
pm2 start /opt/divoxutils-automation/ecosystem.config.cjs
```

**Environment variables not loading:**

```bash
ssh root@YOUR_DROPLET_IP
cat /opt/divoxutils-automation/.env
pm2 restart divoxutils-automation --update-env
```

**Check system resources:**

```bash
ssh root@YOUR_DROPLET_IP
free -h
df -h
pm2 monit
```
