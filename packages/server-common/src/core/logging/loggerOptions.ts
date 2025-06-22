import type { CreateWinstonLoggerOptions } from '@shellicar/winston-azure-application-insights';
import { telemetryClient } from './telemetryClient';

export const loggerOptions = {
  insights: {
    client: telemetryClient,
    version: 3,
  },
  winston: {
    console: true,
    level: 'info',
  },
} satisfies CreateWinstonLoggerOptions;
