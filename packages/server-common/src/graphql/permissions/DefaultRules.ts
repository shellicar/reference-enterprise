import type { IRules } from 'graphql-shield';
import { rules } from './rules';

export const CoreRules = {
  '*': rules.notAllowed,
  Query: {
    '*': rules.notAllowed,
  },
  Mutation: {
    '*': rules.notAllowed,
  },
} satisfies IRules;
