import { resolvers, typeDefs } from '@graphql/generated';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive/apollo4';
import { middleware } from './middleware';

let schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, ...typeDefs],
  resolvers,
});

schema = middleware(schema);

export { schema };
