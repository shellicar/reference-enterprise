/**
 * @fileoverview Ambient type declarations for virtual modules
 * @description Type declarations for auto-generated GraphQL modules
 * @author Stephen Hellicar
 */
declare module '@graphql/generated' {
  import type { DocumentNode } from 'graphql';
  import type { IResolvers } from '@graphql-tools/utils';
  import type { IRules } from 'graphql-shield';

  export const typeDefs: DocumentNode[];
  export const resolvers: IResolvers[];
  export const rules: IRules[];
}
