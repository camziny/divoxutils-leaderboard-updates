module.exports = {
  apps: [{
    name: 'divoxutils-automation',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '100M',
    env_file: '.env',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    time: true
  }]
} 