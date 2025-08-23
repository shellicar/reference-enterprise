import { GraphQLError } from 'graphql';
import { type IRule, rule } from 'graphql-shield';
import { log } from './log';

export const notAllowed: IRule = rule({ cache: 'contextual' })(async (_parent, _args, ctx: any, info) => {
  const result = new GraphQLError('Not Allowed', {
    extensions: { http: { status: 403 } },
  });
  log('notAllowed', ctx, info, result);
  return result;
});
