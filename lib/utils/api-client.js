import fetch from 'node-fetch'
import { config } from '../config.js'

export class ApiClient {
  constructor(logger) {
    this.logger = logger
    this.baseUrl = config.apiBaseUrl
    this.cronSecret = config.cronSecret
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cronSecret}`,
        ...options.headers
      },
      ...options
    }

    let lastError
    
    for (let attempt = 1; attempt <= config.retryLimit; attempt++) {
      try {
        this.logger.info(`Making request to ${endpoint}`, { attempt, url })
        
        const response = await fetch(url, requestOptions)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        this.logger.info(`Request successful`, { endpoint, data })
        return data
        
      } catch (error) {
        lastError = error
        this.logger.error(`Request failed (attempt ${attempt}/${config.retryLimit})`, {
          endpoint,
          error: error.message,
          attempt
        })
        
        if (attempt < config.retryLimit) {
          const delay = config.backoffBaseDelay * Math.pow(2, attempt - 1)
          this.logger.info(`Retrying in ${delay}ms...`, { attempt, delay })
          await this.sleep(delay)
        }
      }
    }
    
    throw new Error(`Failed after ${config.retryLimit} attempts: ${lastError.message}`)
  }

  async resetBatchState() {
    return this.makeRequest('/api/resetBatchState')
  }

  async batchedLeaderboardUpdate() {
    return this.makeRequest('/api/batchedLeaderboardUpdate')
  }

  async resetHeraldBatchState() {
    return this.makeRequest('/api/resetHeraldBatchState')
  }

  async batchedHeraldUpdate() {
    return this.makeRequest('/api/batchedHeraldUpdate')
  }
} 