import { Logger } from '../utils/logger.js'
import { ApiClient } from '../utils/api-client.js'

export async function runHeraldBatchJob() {
  const logger = new Logger('daily-herald')
  const apiClient = new ApiClient(logger)
  
  try {
    logger.info('Starting daily herald update job')
    
    logger.info('Resetting herald batch state...')
    await apiClient.resetHeraldBatchState()
    logger.info('Herald batch state reset successfully')
    
    let totalBatches = 0
    let updatedCharacters = 0
    
    do {
      logger.info(`Starting herald batch update #${totalBatches + 1}`)
      const response = await apiClient.batchedHeraldUpdate()
      
      updatedCharacters = response.updatedCharacters || 0
      totalBatches++
      
      logger.info(`Herald batch #${totalBatches} completed`, {
        checked_characters: response.checkedCharacters || 0,
        updated_characters: updatedCharacters,
        failed_updates: response.failedUpdates || 0,
        total_batches: totalBatches
      })
      
    } while (updatedCharacters > 0)
    
    logger.info('Daily herald update job completed successfully', {
      total_batches: totalBatches
    })
    
    return {
      success: true,
      totalBatches,
      summary: logger.getJobSummary()
    }
    
  } catch (error) {
    logger.critical('Daily herald update job failed', {
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