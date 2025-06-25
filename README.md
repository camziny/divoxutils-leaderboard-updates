# divoxutils Automation Agent

**Automated backend service that keeps character statistics current for a Dark Age of Camelot community website by synchronizing data with the official game API.**

## 📋 Features

### Weekly Performance Tracking

Calculates week-over-week changes in player statistics, enabling dynamic leaderboards that show who's improving and trending analysis for community engagement.

### Daily Character Updates

Performs comprehensive daily synchronization with the official Camelot Herald API to keep all character profiles current with the latest game data.

### Real-Time Character Profiles

Keeps comprehensive character information current by syncing with the official Camelot Herald API. Users can search for any character and see accurate realm points, kill/death ratios, guild affiliations, and progression.

## 📅 Schedule

- **Weekly Leaderboard**: Mondays at 12:00 AM EST
- **Daily Herald**: Tuesday-Sunday at 12:00 AM EST
- **Monday Herald**: Mondays at 12:00 PM EST
- **Heartbeat**: Every hour (health monitoring)

## 📁 Project Structure

```
├── lib/                 # Core application code
│   ├── jobs/           # Scheduled job implementations
│   └── utils/          # Utility modules
├── scripts/            # Management scripts
│   └── deployment/     # DO deployment scripts
├── docs/               # Documentation
└── logs/               # Application logs
```

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for detailed structure.

## 🔧 Configuration

Environment variables required:

- `API_BASE_URL` - DivoxUtils API endpoint
- `CRON_SECRET` - Authentication token
- `RETRY_LIMIT` - Retry attempts (default: 3)
- `BACKOFF_BASE_DELAY` - Retry delay (default: 5000ms)
- `BATCH_DELAY` - Batch processing delay (default: 1500ms)

## 📚 Documentation

- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🎯 Impact

This tool enables divoxutils to serve as a reliable, always-current resource for the Dark Age of Camelot community. Players can trust that leaderboard positions reflect recent performance and character lookups show real statistics.

The system processes thousands of character records weekly, allowing the community site to focus on features and user experience rather than data maintenance.
