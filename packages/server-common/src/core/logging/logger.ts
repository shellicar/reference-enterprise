import { createWinstonLogger } from '@shellicar/winston-azure-application-insights';
import { loggerOptions } from './loggerOptions';

export const logger = createWinstonLogger(loggerOptions);
