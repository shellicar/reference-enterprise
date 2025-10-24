import type { GraphQLSchema } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './permissions';

export const middleware = (schema: GraphQLSchema) => applyMiddleware(schema, permissions);
