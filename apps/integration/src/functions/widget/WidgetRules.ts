import { rules } from '@shellicar-reference-enterprise/server-common/graphql/permissions/rules';
import type { IRules } from 'graphql-shield';

export const WidgetRules = {
  Query: {
    widget: rules.allowed,
  },
  WidgetQueries: {
    '*': rules.notAllowed,
  },
  Mutation: {
    widget: rules.allowed,
  },
  WidgetMutations: {
    '*': rules.notAllowed,
    delete: rules.allowed,
  },
} satisfies IRules;
