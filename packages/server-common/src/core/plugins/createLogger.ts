export interface LoggerOptions {
  debug?: boolean;
  verbose?: boolean;
}

export interface ILogger {
  debug: (message: string, ...args: any[]) => void;
  verbose: (message: string, ...args: any[]) => void;
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
}

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  green: '\x1b[32m',
};

export function createLogger(prefix: string, options: LoggerOptions = {}): ILogger {
  const logPrefix = `[${prefix}]`;

  return {
    debug: (message: string, ...args: any[]) => {
      if (options.debug) {
        console.log(`${colors.blue}${logPrefix} DEBG${colors.reset} ${message}`, ...args);
      }
    },
    verbose: (message: string, ...args: any[]) => {
      if (options.verbose) {
        console.log(`${colors.gray}${logPrefix} VERB${colors.reset} ${message}`, ...args);
      }
    },
    info: (message: string, ...args: any[]) => {
      console.log(`${colors.green}${logPrefix} INFO${colors.reset} ${message}`, ...args);
    },
    warn: (message: string, ...args: any[]) => {
      console.warn(`${colors.yellow}${logPrefix} WARN${colors.reset} ${message}`, ...args);
    },
    error: (message: string, ...args: any[]) => {
      console.error(`${colors.red}${logPrefix} EROR${colors.reset} ${message}`, ...args);
    },
  };
}
