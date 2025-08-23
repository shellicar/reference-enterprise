import type { Logger } from '@apollo/utils.logger';
import { logger } from '@shellicar-reference-enterprise/server-common/core/logging/logger';

export const apolloLogger = {
  debug(message) {
    logger.debug(message);
  },
  error(message) {
    logger.error(message);
  },
  info(message) {
    logger.info(message);
  },
  warn(message) {
    logger.warn(message);
  },
} satisfies Logger;

export { apolloLogger as logger };
