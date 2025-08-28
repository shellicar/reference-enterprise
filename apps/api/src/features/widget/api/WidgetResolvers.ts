import type { IResolvers } from '@graphql-tools/utils';
import { IWidgetCreateResolver, IWidgetGetResolver, IWidgetSearchResolver, IWidgetStartResolver } from '../interfaces';

export const WidgetResolver = {
  Query: {
    widget: () => ({}),
  },
  Mutation: {
    widget: () => ({}),
  },
  WidgetQueries: {
    search: (_, { input }, { scope }) => scope.resolve(IWidgetSearchResolver).query(input),
    get: (_, { input }, { scope }) => scope.resolve(IWidgetGetResolver).query(input),
  },
  WidgetMutations: {
    create: (_, { input }, { scope }) => scope.resolve(IWidgetCreateResolver).mutate(input),
    start: (_, { input }, { scope }) => scope.resolve(IWidgetStartResolver).mutate(input),
  },
} satisfies IResolvers;
