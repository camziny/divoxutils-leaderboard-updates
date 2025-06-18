export default {
  apps: [{
    name: 'divoxutils-automation',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '100M',
    env: {
      NODE_ENV: 'production'
    },
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    time: true
  }]
} 