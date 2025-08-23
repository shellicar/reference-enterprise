import type { IRules } from 'graphql-shield';
import { rules } from './permissions/rules';

export const DefaultRules = {
  '*': rules.notAllowed,
  Query: {
    '*': rules.notAllowed,
  },
  Mutation: {
    '*': rules.notAllowed,
  },
} satisfies IRules;
