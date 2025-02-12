import chalk from 'chalk'

const logLevelPriority: Record<LogLevel, number> = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'
export type LogFunction = (message: string, logLevel?: LogLevel) => void

export class Logger {
  private static logLevel: LogLevel

  public static create(logLevel: LogLevel) {
    Logger.logLevel = logLevel
  }

  private static getTime(): string {
    const date = new Date()
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  private static log(message: string, givenLogLevel: LogLevel) {
    if (logLevelPriority[givenLogLevel] < logLevelPriority[Logger.logLevel]) {
      return // Don't log if the message's level is below the current log level.
    }

    const time = chalk.gray(this.getTime())
    if (givenLogLevel == 'error') {
      console.error(`${time} ${chalk.red('ERROR')} :: ${message}`)
    } else if (givenLogLevel == 'warn') {
      console.log(`${time} ${chalk.red('WARN')} :: ${message}`)
    } else if (givenLogLevel == 'info') {
      console.log(`${time} ${chalk.green('INFO')} :: ${message}`)
    } else {
      console.log(`${time} DEBUG :: ${message}`)
    }
  }

  public static debug(message: string) {
    Logger.log(message, 'debug')
  }

  public static info(message: string) {
    Logger.log(message, 'info')
  }

  public static warn(message: string) {
    Logger.log(message, 'warn')
  }

  public static error(message: string) {
    Logger.log(message, 'error')
  }
}
