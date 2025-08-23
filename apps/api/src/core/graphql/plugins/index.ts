import type { ApolloServerPlugin } from '@apollo/server';
import { createApollo4QueryValidationPlugin } from 'graphql-constraint-directive/apollo4';

export const plugins = [createApollo4QueryValidationPlugin()] satisfies ApolloServerPlugin[];
