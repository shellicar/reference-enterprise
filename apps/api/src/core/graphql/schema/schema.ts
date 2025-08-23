import { makeExecutableSchema } from '@graphql-tools/schema';
import typedefs from '@shellicar/build-graphql/typedefs';
import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive/apollo4';
import { resolvers } from './resolvers';

export const schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typedefs],
  resolvers,
});
