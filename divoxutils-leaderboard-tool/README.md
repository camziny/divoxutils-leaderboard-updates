# divoxutils Leaderboard Tool

**Automated backend service that maintains up-to-date character data for divoxutils by running scheduled batch jobs against the Camelot Herald API.**

## What This Tool Does

This automation agent replaces manual leaderboard updates by running two critical maintenance jobs:

### 🏆 **Weekly Leaderboard Updates** (Mondays 12:00 AM EST)

- **Purpose**: Tracks weekly performance changes for leaderboard rankings
- **Process**: Fetches current stats from Herald API and calculates weekly differences (realm points, solo kills, deaths)
- **Batch Size**: 100 characters per request
- **Criteria**: Only updates characters that haven't been updated since the last Monday
- **Impact**: Powers weekly leaderboard rankings and "most improved" statistics

### 🗞️ **Daily Herald Updates** (Every day 12:00 AM EST)

- **Purpose**: Keeps comprehensive character profiles current
- **Process**: Syncs all Herald data including realm stats, guild info, master levels, and PvP statistics
- **Batch Size**: 100 characters per request
- **Scope**: Updates character names, levels, realm points, kill/death ratios, and faction-specific stats
- **Impact**: Ensures character search and profile pages show accurate information

## Technical Architecture

- **Runtime**: Node.js with PM2 process management
- **Scheduling**: Native cron jobs (no external dependencies)
- **Error Handling**: Exponential backoff retry logic (3 attempts: 5s, 15s, 30s delays)
- **Logging**: Persistent file-based logs with daily rotation
- **Scalability**: No timeout limits - processes unlimited batches until completion
- **Resilience**: Auto-restart on crashes, survives server reboots

## Monitoring

### Log Files

- `./logs/daily-herald-YYYY-MM-DD.log` - Herald update details
- `./logs/weekly-leaderboard-YYYY-MM-DD.log` - Leaderboard update details
- `./logs/combined.log` - System-level logs
- `./logs/error.log` - Error tracking

### Key Metrics Logged

- Characters checked/updated per batch
- API response times and success rates
- Failed update counts and error details
- Job start/end times and total duration
- Batch progression tracking

## Environment Configuration

Required environment variables:

```env
API_BASE_URL=http://divoxutils.com
CRON_SECRET=your-api-endpoint-secret
RETRY_LIMIT=3
BACKOFF_BASE_DELAY=5000
```

## Management Commands

```bash
# Start the automation agent
npm run pm2:start

# Monitor real-time logs
npm run pm2:logs

# Check agent status
pm2 status divoxutils-automation

# Restart if needed
npm run pm2:restart
```

## Resource Usage

- **Memory**: ~30-50MB RAM
- **CPU**: Minimal (only active during scheduled jobs)
- **Storage**: Log files grow ~5-10MB per month
- **Network**: Sequential API calls to Herald (not parallel flooding)

This tool ensures divoxutils always displays current, accurate character data without manual intervention.
