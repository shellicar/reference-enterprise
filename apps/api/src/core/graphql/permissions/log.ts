import { logger } from '@shellicar-reference-enterprise/server-common/core/logging/logger';
import type { GraphQLResolveInfo } from 'graphql';

export const log = (name: string, ctx: any, info: GraphQLResolveInfo, result: true | Error) => {
  const operationName = info.operation.name?.value;
  const fieldName = info.fieldName;
  const path = info.path?.key;

  logger.verbose(`Rule.${name}`, { user: ctx.user, result, operationName, path, fieldName });
};
