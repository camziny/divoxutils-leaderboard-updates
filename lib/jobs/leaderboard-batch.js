import { Logger } from '../utils/logger.js'
import { ApiClient } from '../utils/api-client.js'
import { config } from '../config.js'

export async function runLeaderboardBatchJob() {
  const logger = new Logger('weekly-leaderboard')
  const apiClient = new ApiClient(logger)
  
  try {
    logger.info('Starting weekly leaderboard update job')
    
    logger.info('Resetting batch state...')
    await apiClient.resetBatchState()
    logger.info('Batch state reset successfully')
    
    let totalBatches = 0
    let checkedCharacters = 0
    
    do {
      logger.info(`Starting batch update #${totalBatches + 1}`)
      const response = await apiClient.batchedLeaderboardUpdate()
      
      checkedCharacters = response.checkedCharacters || 0
      totalBatches++
      
      logger.info(`Batch #${totalBatches} completed`, {
        checked_characters: checkedCharacters,
        updated_characters: response.updatedCharacters || 0,
        failed_updates: response.failedUpdates || 0,
        total_batches: totalBatches
      })
      
      if (checkedCharacters > 0) {
        logger.info(`Waiting ${config.batchDelay}ms before next batch...`)
        await new Promise(resolve => setTimeout(resolve, config.batchDelay))
      }
      
    } while (checkedCharacters > 0)
    
    logger.info('Weekly leaderboard update job completed successfully', {
      total_batches: totalBatches
    })
    
    return {
      success: true,
      totalBatches,
      summary: logger.getJobSummary()
    }
    
  } catch (error) {
    logger.critical('Weekly leaderboard update job failed', {
      error: error.message,
      stack: error.stack
    })
    
    return {
      success: false,
      error: error.message,
      summary: logger.getJobSummary()
    }
  }
} 