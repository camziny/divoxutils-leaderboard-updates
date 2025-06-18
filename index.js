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

cron.schedule('0 0 * * *', async () => {
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

console.log('✅ Scheduled jobs configured:')
console.log('   📅 Weekly Leaderboard: Mondays at 12:00 AM EST')
console.log('   📅 Daily Herald: Every day at 12:00 AM EST')
console.log('🎯 Automation agent is now running...')

process.on('SIGINT', () => {
  console.log('\n👋 Gracefully shutting down automation agent...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n👋 Gracefully shutting down automation agent...')
  process.exit(0)
}) 