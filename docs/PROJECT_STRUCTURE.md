# Project Structure

## Overview

divoxutils Automation Agent - A scheduled job runner for maintaining Dark Age of Camelot character statistics.

## Directory Structure

```
divoxutils-leaderboard-updates/
├── lib/                      # Core application code
│   ├── config.js            # Configuration management
│   ├── jobs/                # Scheduled job implementations
│   │   ├── herald-batch.js  # Daily herald update job
│   │   └── leaderboard-batch.js # Weekly leaderboard job
│   └── utils/               # Utility modules
│       ├── api-client.js    # API communication layer
│       └── logger.js        # Logging utilities
├── scripts/                 # Management scripts
│   ├── deployment/          # Digital Ocean deployment scripts
│   ├── local/              # Local-only scripts (gitignored)
│   └── monitoring/         # Monitoring utilities
├── logs/                   # Application logs (gitignored)
├── docs/                   # Documentation
├── index.js               # Main application entry point
├── package.json           # Node.js dependencies
├── ecosystem.config.cjs   # PM2 configuration
├── Dockerfile            # Docker container definition
├── .dockerignore         # Docker build exclusions
├── .gitignore           # Git exclusions
├── app.yaml.example     # DO App Platform config template
└── README.md           # Project overview

```

## Key Files

### Application Core

- **`index.js`** - Sets up cron schedules and starts the automation agent
- **`lib/config.js`** - Manages environment variables and configuration
- **`ecosystem.config.cjs`** - PM2 process manager configuration

### Jobs

- **`lib/jobs/herald-batch.js`** - Runs daily character updates from Herald API
- **`lib/jobs/leaderboard-batch.js`** - Calculates weekly performance metrics

### Deployment

- **`Dockerfile`** - Containerizes the application for cloud deployment
- **`scripts/deployment/*`** - Scripts for deploying to Digital Ocean

## Environment Variables

Required environment variables (set in `.env` or deployment config):

- `API_BASE_URL` - divoxutils API endpoint
- `CRON_SECRET` - Authentication token for API calls
- `RETRY_LIMIT` - Number of retry attempts for failed API calls
- `BACKOFF_BASE_DELAY` - Base delay for exponential backoff
- `BATCH_DELAY` - Delay between batch operations

## Scheduled Jobs

1. **Weekly Leaderboard** - Mondays at 12:00 AM EST
2. **Daily Herald** - Tuesday-Sunday at 12:00 AM EST
3. **Monday Herald** - Mondays at 12:00 PM EST
4. **Heartbeat** - Every hour (health check)
