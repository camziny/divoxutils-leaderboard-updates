# Scripts Directory

This directory contains various scripts for managing the DivoxUtils automation agent.

## Directory Structure

### `/deployment`

Scripts for deploying and managing the automation agent on Digital Ocean droplet:

- `deploy-to-droplet.sh` - Deploy the application to your DO droplet
- `start-on-droplet.sh` - Start the automation agent on the droplet
- `check-droplet-status.sh` - Check the status of the agent on the droplet

### `/local`

Local-only scripts and configurations (not tracked in git):

- LaunchAgent plist files for macOS
- Local health check scripts
- Local restart scripts

### `/monitoring`

Scripts for monitoring and maintenance (if needed in the future)
