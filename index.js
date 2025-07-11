import 'dotenv/config'
import cron from 'node-cron'
import { runLeaderboardBatchJob } from './lib/jobs/leaderboard-batch.js'
import { runHeraldBatchJob } from './lib/jobs/herald-batch.js'
import { validateConfig } from './lib/config.js'

console.log('🚀 DivoxUtils Automation Agent Starting...')

try {
  validateConfig()
  console.log('✅ Configuration validated successfully')
} catch (error) {
  console.error('❌ Configuration error:', error.message)
  process.exit(1)
}

console.log('📅 Setting up scheduled jobs...')

cron.schedule('0 0 * * 1', async () => {
  console.log('🏆 Starting weekly leaderboard update job...')
  try {
    const result = await runLeaderboardBatchJob()
    if (result.success) {
      console.log(`✅ Weekly leaderboard job completed successfully! Total batches: ${result.totalBatches}`)
    } else {
      console.error(`❌ Weekly leaderboard job failed: ${result.error}`)
    }
  } catch (error) {
    console.error('💥 Critical error in weekly leaderboard job:', error.message)
  }
}, {
  timezone: "America/New_York"
})

cron.schedule('0 0 * * 0,2-6', async () => {
  console.log('🗞️ Starting daily herald update job...')
  try {
    const result = await runHeraldBatchJob()
    if (result.success) {
      console.log(`✅ Daily herald job completed successfully! Total batches: ${result.totalBatches}`)
    } else {
      console.error(`❌ Daily herald job failed: ${result.error}`)
    }
  } catch (error) {
    console.error('💥 Critical error in daily herald job:', error.message)
  }
}, {
  timezone: "America/New_York"
})

cron.schedule('0 12 * * 1', async () => {
  console.log('🗞️ Starting Monday herald update job (12:00 PM EST)...')
  try {
    const result = await runHeraldBatchJob()
    if (result.success) {
      console.log(`✅ Monday herald job completed successfully! Total batches: ${result.totalBatches}`)
    } else {
      console.error(`❌ Monday herald job failed: ${result.error}`)
    }
  } catch (error) {
    console.error('💥 Critical error in Monday herald job:', error.message)
  }
}, {
  timezone: "America/New_York"
})

cron.schedule('0 * * * *', () => {
  console.log(`💓 Heartbeat: ${new Date().toISOString()} - Automation agent is alive and monitoring`)
}, {
  timezone: "America/New_York"
})

console.log('✅ Scheduled jobs configured:')
console.log('   📅 Weekly Leaderboard: Mondays at 12:00 AM EST')
console.log('   📅 Daily Herald: Tuesday-Sunday at 12:00 AM EST')
console.log('   📅 Monday Herald: Mondays at 12:00 PM EST')
console.log('   💓 Heartbeat: Every hour on the hour')
console.log('🎯 Automation agent is now running...')

process.on('SIGINT', () => {
  console.log('\n👋 Gracefully shutting down automation agent...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n👋 Gracefully shutting down automation agent...')
  process.exit(0)
}) 