import { type IRule, rule } from 'graphql-shield';

export const allowed: IRule = rule({ cache: 'contextual' })(async (_parent, _args, _ctx: any, _info) => {
  return true;
});
