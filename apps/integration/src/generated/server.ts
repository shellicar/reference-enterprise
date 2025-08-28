import type { UUID } from 'node:crypto';
import type { Instant } from '@js-joda/core';
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Cursor: { input: string; output: string };
  Instant: { input: Instant; output: Instant };
  UUID: { input: UUID; output: UUID };
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly widget: WidgetMutations;
};

export type MutationProblem = {
  readonly details: ReadonlyArray<MutationProblemDetails>;
  readonly message: Scalars['String']['output'];
};

export type MutationProblemDetails = {
  readonly key: Scalars['String']['output'];
  readonly value: Scalars['String']['output'];
};

export type PageInfo = {
  readonly __typename?: 'PageInfo';
  readonly count: Scalars['Int']['output'];
  readonly endCursor?: Maybe<Scalars['Cursor']['output']>;
  readonly hasNextPage: Scalars['Boolean']['output'];
  readonly total: Scalars['Int']['output'];
};

export type Query = {
  readonly __typename?: 'Query';
  readonly widget: WidgetQueries;
};

export type StringFilter = {
  readonly contains?: InputMaybe<Scalars['String']['input']>;
  readonly endsWith?: InputMaybe<Scalars['String']['input']>;
  readonly eq?: InputMaybe<Scalars['String']['input']>;
  readonly ne?: InputMaybe<Scalars['String']['input']>;
  readonly startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Widget = {
  readonly __typename?: 'Widget';
  readonly created: Scalars['Instant']['output'];
  readonly deleted?: Maybe<Scalars['Instant']['output']>;
  readonly description?: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['UUID']['output'];
  readonly modified: Scalars['Instant']['output'];
  readonly name: Scalars['String']['output'];
};

export type WidgetDeleteInput = {
  readonly description: Scalars['String']['input'];
  readonly name: Scalars['String']['input'];
};

export type WidgetDeletePayload = WidgetDeletePayloadFailure | WidgetDeletePayloadSuccess;

export type WidgetDeletePayloadFailure = {
  readonly __typename?: 'WidgetDeletePayloadFailure';
  readonly errors: ReadonlyArray<WidgetDeletePayloadFailureError>;
  readonly status: WidgetDeletePayloadFailureStatus;
};

export type WidgetDeletePayloadFailureError = MutationProblem & {
  readonly __typename?: 'WidgetDeletePayloadFailureError';
  readonly details: ReadonlyArray<MutationProblemDetails>;
  readonly message: Scalars['String']['output'];
};

export type WidgetDeletePayloadFailureErrorDetails = MutationProblemDetails & {
  readonly __typename?: 'WidgetDeletePayloadFailureErrorDetails';
  readonly key: Scalars['String']['output'];
  readonly value: Scalars['String']['output'];
};

export enum WidgetDeletePayloadFailureStatus {
  AlreadyExists = 'ALREADY_EXISTS',
  InternalError = 'INTERNAL_ERROR',
  InvalidInput = 'INVALID_INPUT',
}

export type WidgetDeletePayloadSuccess = {
  readonly __typename?: 'WidgetDeletePayloadSuccess';
  readonly id: Scalars['UUID']['output'];
};

export type WidgetFeed = {
  readonly __typename?: 'WidgetFeed';
  readonly cursor?: Maybe<Scalars['Cursor']['output']>;
  readonly items: ReadonlyArray<Widget>;
};

export type WidgetGetInput = {
  readonly id: Scalars['UUID']['input'];
};

export type WidgetMutations = {
  readonly __typename?: 'WidgetMutations';
  readonly delete: WidgetDeletePayload;
};

export type WidgetMutations_DeleteArgs = {
  input: WidgetDeleteInput;
};

export type WidgetQueries = {
  readonly __typename?: 'WidgetQueries';
  readonly get?: Maybe<Widget>;
  readonly search: WidgetFeed;
};

export type WidgetQueries_GetArgs = {
  input: WidgetGetInput;
};

export type WidgetQueries_SearchArgs = {
  input: WidgetSearchInput;
};

export type WidgetSearchInput = {
  readonly cursor?: InputMaybe<Scalars['Cursor']['input']>;
  readonly description?: InputMaybe<StringFilter>;
  readonly limit?: InputMaybe<Scalars['Int']['input']>;
  readonly name?: InputMaybe<StringFilter>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  WidgetDeletePayload: (Omit<WidgetDeletePayloadFailure, 'errors'> & { errors: ReadonlyArray<_RefType['WidgetDeletePayloadFailureError']> }) | (Omit<WidgetDeletePayloadSuccess, 'id'> & { id: _RefType['UUID'] });
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  MutationProblem: Omit<WidgetDeletePayloadFailureError, 'details'> & { details: ReadonlyArray<_RefType['MutationProblemDetails']> };
  MutationProblemDetails: WidgetDeletePayloadFailureErrorDetails;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']['output']>;
  Instant: ResolverTypeWrapper<Instant>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationProblem: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MutationProblem']>;
  MutationProblemDetails: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MutationProblemDetails']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringFilter: StringFilter;
  UUID: ResolverTypeWrapper<UUID>;
  Widget: ResolverTypeWrapper<Omit<Widget, 'created' | 'deleted' | 'id' | 'modified'> & { created: ResolversTypes['Instant']; deleted?: Maybe<ResolversTypes['Instant']>; id: ResolversTypes['UUID']; modified: ResolversTypes['Instant'] }>;
  WidgetDeleteInput: WidgetDeleteInput;
  WidgetDeletePayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['WidgetDeletePayload']>;
  WidgetDeletePayloadFailure: ResolverTypeWrapper<Omit<WidgetDeletePayloadFailure, 'errors'> & { errors: ReadonlyArray<ResolversTypes['WidgetDeletePayloadFailureError']> }>;
  WidgetDeletePayloadFailureError: ResolverTypeWrapper<Omit<WidgetDeletePayloadFailureError, 'details'> & { details: ReadonlyArray<ResolversTypes['MutationProblemDetails']> }>;
  WidgetDeletePayloadFailureErrorDetails: ResolverTypeWrapper<WidgetDeletePayloadFailureErrorDetails>;
  WidgetDeletePayloadFailureStatus: WidgetDeletePayloadFailureStatus;
  WidgetDeletePayloadSuccess: ResolverTypeWrapper<Omit<WidgetDeletePayloadSuccess, 'id'> & { id: ResolversTypes['UUID'] }>;
  WidgetFeed: ResolverTypeWrapper<WidgetFeed>;
  WidgetGetInput: WidgetGetInput;
  WidgetMutations: ResolverTypeWrapper<Omit<WidgetMutations, 'delete'> & { delete: ResolversTypes['WidgetDeletePayload'] }>;
  WidgetQueries: ResolverTypeWrapper<WidgetQueries>;
  WidgetSearchInput: WidgetSearchInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Cursor: Scalars['Cursor']['output'];
  Instant: Instant;
  Int: Scalars['Int']['output'];
  Mutation: {};
  MutationProblem: ResolversInterfaceTypes<ResolversParentTypes>['MutationProblem'];
  MutationProblemDetails: ResolversInterfaceTypes<ResolversParentTypes>['MutationProblemDetails'];
  PageInfo: PageInfo;
  Query: {};
  String: Scalars['String']['output'];
  StringFilter: StringFilter;
  UUID: UUID;
  Widget: Omit<Widget, 'created' | 'deleted' | 'id' | 'modified'> & { created: ResolversParentTypes['Instant']; deleted?: Maybe<ResolversParentTypes['Instant']>; id: ResolversParentTypes['UUID']; modified: ResolversParentTypes['Instant'] };
  WidgetDeleteInput: WidgetDeleteInput;
  WidgetDeletePayload: ResolversUnionTypes<ResolversParentTypes>['WidgetDeletePayload'];
  WidgetDeletePayloadFailure: Omit<WidgetDeletePayloadFailure, 'errors'> & { errors: ReadonlyArray<ResolversParentTypes['WidgetDeletePayloadFailureError']> };
  WidgetDeletePayloadFailureError: Omit<WidgetDeletePayloadFailureError, 'details'> & { details: ReadonlyArray<ResolversParentTypes['MutationProblemDetails']> };
  WidgetDeletePayloadFailureErrorDetails: WidgetDeletePayloadFailureErrorDetails;
  WidgetDeletePayloadSuccess: Omit<WidgetDeletePayloadSuccess, 'id'> & { id: ResolversParentTypes['UUID'] };
  WidgetFeed: WidgetFeed;
  WidgetGetInput: WidgetGetInput;
  WidgetMutations: Omit<WidgetMutations, 'delete'> & { delete: ResolversParentTypes['WidgetDeletePayload'] };
  WidgetQueries: WidgetQueries;
  WidgetSearchInput: WidgetSearchInput;
};

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor';
}

export interface InstantScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Instant'], any> {
  name: 'Instant';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  widget?: Resolver<ResolversTypes['WidgetMutations'], ParentType, ContextType>;
};

export type MutationProblemResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationProblem'] = ResolversParentTypes['MutationProblem']> = {
  __resolveType: TypeResolveFn<'WidgetDeletePayloadFailureError', ParentType, ContextType>;
  details?: Resolver<ReadonlyArray<ResolversTypes['MutationProblemDetails']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationProblemDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationProblemDetails'] = ResolversParentTypes['MutationProblemDetails']> = {
  __resolveType: TypeResolveFn<'WidgetDeletePayloadFailureErrorDetails', ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  widget?: Resolver<ResolversTypes['WidgetQueries'], ParentType, ContextType>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type WidgetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Widget'] = ResolversParentTypes['Widget']> = {
  created?: Resolver<ResolversTypes['Instant'], ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Instant']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  modified?: Resolver<ResolversTypes['Instant'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetDeletePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetDeletePayload'] = ResolversParentTypes['WidgetDeletePayload']> = {
  __resolveType: TypeResolveFn<'WidgetDeletePayloadFailure' | 'WidgetDeletePayloadSuccess', ParentType, ContextType>;
};

export type WidgetDeletePayloadFailureResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetDeletePayloadFailure'] = ResolversParentTypes['WidgetDeletePayloadFailure']> = {
  errors?: Resolver<ReadonlyArray<ResolversTypes['WidgetDeletePayloadFailureError']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['WidgetDeletePayloadFailureStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetDeletePayloadFailureErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetDeletePayloadFailureError'] = ResolversParentTypes['WidgetDeletePayloadFailureError']> = {
  details?: Resolver<ReadonlyArray<ResolversTypes['MutationProblemDetails']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetDeletePayloadFailureErrorDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetDeletePayloadFailureErrorDetails'] = ResolversParentTypes['WidgetDeletePayloadFailureErrorDetails']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetDeletePayloadSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetDeletePayloadSuccess'] = ResolversParentTypes['WidgetDeletePayloadSuccess']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetFeedResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetFeed'] = ResolversParentTypes['WidgetFeed']> = {
  cursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  items?: Resolver<ReadonlyArray<ResolversTypes['Widget']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetMutations'] = ResolversParentTypes['WidgetMutations']> = {
  delete?: Resolver<ResolversTypes['WidgetDeletePayload'], ParentType, ContextType, RequireFields<WidgetMutations_DeleteArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetQueries'] = ResolversParentTypes['WidgetQueries']> = {
  get?: Resolver<Maybe<ResolversTypes['Widget']>, ParentType, ContextType, RequireFields<WidgetQueries_GetArgs, 'input'>>;
  search?: Resolver<ResolversTypes['WidgetFeed'], ParentType, ContextType, RequireFields<WidgetQueries_SearchArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Cursor?: GraphQLScalarType;
  Instant?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  MutationProblem?: MutationProblemResolvers<ContextType>;
  MutationProblemDetails?: MutationProblemDetailsResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  Widget?: WidgetResolvers<ContextType>;
  WidgetDeletePayload?: WidgetDeletePayloadResolvers<ContextType>;
  WidgetDeletePayloadFailure?: WidgetDeletePayloadFailureResolvers<ContextType>;
  WidgetDeletePayloadFailureError?: WidgetDeletePayloadFailureErrorResolvers<ContextType>;
  WidgetDeletePayloadFailureErrorDetails?: WidgetDeletePayloadFailureErrorDetailsResolvers<ContextType>;
  WidgetDeletePayloadSuccess?: WidgetDeletePayloadSuccessResolvers<ContextType>;
  WidgetFeed?: WidgetFeedResolvers<ContextType>;
  WidgetMutations?: WidgetMutationsResolvers<ContextType>;
  WidgetQueries?: WidgetQueriesResolvers<ContextType>;
};
