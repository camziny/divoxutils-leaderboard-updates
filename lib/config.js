import 'dotenv/config'

export const config = {
  apiBaseUrl: process.env.API_BASE_URL,
  cronSecret: process.env.CRON_SECRET,
  retryLimit: parseInt(process.env.RETRY_LIMIT || '3'),
  backoffBaseDelay: parseInt(process.env.BACKOFF_BASE_DELAY || '5000')
}

export function validateConfig() {
  const required = ['apiBaseUrl', 'cronSecret']
  const missing = required.filter(key => !config[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
} 