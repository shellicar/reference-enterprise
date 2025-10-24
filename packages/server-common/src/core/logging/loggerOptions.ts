import { ApplicationInsightsVersion, type CreateWinstonLoggerOptions } from '@shellicar/winston-azure-application-insights';
import { telemetryClient } from './telemetryClient';

export const loggerOptions = {
  insights: {
    client: telemetryClient,
    version: ApplicationInsightsVersion.V3,
  },
} satisfies CreateWinstonLoggerOptions;
