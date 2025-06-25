module.exports = {
  apps: [{
    name: 'divoxutils-automation',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '100M',
    env: {
      NODE_ENV: 'production',
      API_BASE_URL: process.env.API_BASE_URL,
      CRON_SECRET: process.env.CRON_SECRET,
      RETRY_LIMIT: process.env.RETRY_LIMIT || '3',
      BACKOFF_BASE_DELAY: process.env.BACKOFF_BASE_DELAY || '5000',
      BATCH_DELAY: process.env.BATCH_DELAY || '1500'
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    time: true
  }]
} 