import { rules } from '@shellicar-reference-enterprise/server-common/graphql/permissions/rules';
import type { IRules } from 'graphql-shield';

export const DefaultRules = {
  Query: {
    '*': rules.notAllowed,
  },
  Mutation: {
    '*': rules.notAllowed,
  },
} satisfies IRules;
