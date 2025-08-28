import type { Resolvers, WidgetMutations, WidgetQueries } from '../../generated/server';
import { IWidgetDeleteResolver, IWidgetGetResolver, IWidgetSearchResolver } from './interfaces';

export const WidgetResolver = {
  Query: {
    widget: () => ({}) as WidgetQueries,
  },
  Mutation: {
    widget: () => ({}) as WidgetMutations,
  },
  WidgetQueries: {
    search: (_, { input }, { scope }) => scope.resolve(IWidgetSearchResolver).query(input),
    get: (_, { input }, { scope }) => scope.resolve(IWidgetGetResolver).query(input),
  },
  WidgetMutations: {
    delete: (_, { input }, { scope }) => scope.resolve(IWidgetDeleteResolver).mutate(input),
  },
} satisfies Resolvers;
