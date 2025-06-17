import fs from 'fs'
import path from 'path'

export class Logger {
  constructor(jobName) {
    this.jobName = jobName
    this.startTime = new Date()
    this.logs = []
    
    const logsDir = './logs'
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true })
    }
    
    const today = new Date().toISOString().split('T')[0]
    this.logFilePath = path.join(logsDir, `${jobName}-${today}.log`)
  }

  log(level, message, meta = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      job: this.jobName,
      message,
      ...meta
    }
    
    this.logs.push(logEntry)
    
    console.log(`[${logEntry.timestamp}] ${level.toUpperCase()} [${this.jobName}]: ${message}`, meta)
    
    const logLine = `[${logEntry.timestamp}] ${level.toUpperCase()} [${this.jobName}]: ${message} ${Object.keys(meta).length > 0 ? JSON.stringify(meta) : ''}\n`
    fs.appendFileSync(this.logFilePath, logLine)
  }

  info(message, meta) {
    this.log('info', message, meta)
  }

  error(message, meta) {
    this.log('error', message, meta)
  }

  critical(message, meta) {
    this.log('critical', message, meta)
  }

  getJobSummary() {
    const endTime = new Date()
    const duration = endTime - this.startTime
    
    const summary = {
      jobName: this.jobName,
      startTime: this.startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration: `${duration}ms`,
      logs: this.logs
    }
    
    const summaryLine = `JOB SUMMARY: ${JSON.stringify(summary)}\n`
    fs.appendFileSync(this.logFilePath, summaryLine)
    
    return summary
  }
} 