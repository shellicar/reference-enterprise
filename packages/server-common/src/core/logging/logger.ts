import { createWinstonLogger } from '@shellicar/winston-azure-application-insights';
import type { Logger } from 'winston';
import { loggerOptions } from './loggerOptions';

export const logger: Logger = createWinstonLogger(loggerOptions);
