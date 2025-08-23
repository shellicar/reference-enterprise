import type { IRules } from 'graphql-shield';
import { rules } from '../../core/graphql/permissions/rules';

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
    create: rules.allowed,
  },
} satisfies IRules;
