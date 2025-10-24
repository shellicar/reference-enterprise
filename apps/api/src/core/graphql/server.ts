import { createApolloServer } from '@shellicar-reference-enterprise/server-common/graphql/createApolloServer';
import { serviceProvider } from '../di/serviceProvider';

export const server = createApolloServer({ serviceProvider });
