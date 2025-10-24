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
  readonly description?: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['UUID']['output'];
  readonly modified: Scalars['Instant']['output'];
  readonly name: Scalars['String']['output'];
};

export type WidgetCreateInput = {
  readonly description: Scalars['String']['input'];
  readonly name: Scalars['String']['input'];
};

export type WidgetCreatePayload = WidgetCreatePayloadFailure | WidgetCreatePayloadSuccess;

export type WidgetCreatePayloadFailure = {
  readonly __typename?: 'WidgetCreatePayloadFailure';
  readonly errors: ReadonlyArray<WidgetCreatePayloadFailureError>;
  readonly status: WidgetCreatePayloadFailureStatus;
};

export type WidgetCreatePayloadFailureError = MutationProblem & {
  readonly __typename?: 'WidgetCreatePayloadFailureError';
  readonly details: ReadonlyArray<MutationProblemDetails>;
  readonly message: Scalars['String']['output'];
};

export type WidgetCreatePayloadFailureErrorDetails = MutationProblemDetails & {
  readonly __typename?: 'WidgetCreatePayloadFailureErrorDetails';
  readonly key: Scalars['String']['output'];
  readonly value: Scalars['String']['output'];
};

export enum WidgetCreatePayloadFailureStatus {
  AlreadyExists = 'ALREADY_EXISTS',
  InternalError = 'INTERNAL_ERROR',
  InvalidInput = 'INVALID_INPUT',
}

export type WidgetCreatePayloadSuccess = {
  readonly __typename?: 'WidgetCreatePayloadSuccess';
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
  readonly create: WidgetCreatePayload;
  readonly start: WidgetStartPayload;
};

export type WidgetMutations_CreateArgs = {
  input: WidgetCreateInput;
};

export type WidgetMutations_StartArgs = {
  input: WidgetStartInput;
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

export type WidgetStartInput = {
  readonly id: Scalars['UUID']['input'];
};

export type WidgetStartPayload = WidgetStartPayloadFailure | WidgetStartPayloadSuccess;

export type WidgetStartPayloadFailure = {
  readonly __typename?: 'WidgetStartPayloadFailure';
  readonly errors: ReadonlyArray<WidgetStartPayloadFailureError>;
  readonly status: WidgetStartPayloadFailureStatus;
};

export type WidgetStartPayloadFailureError = MutationProblem & {
  readonly __typename?: 'WidgetStartPayloadFailureError';
  readonly details: ReadonlyArray<MutationProblemDetails>;
  readonly message: Scalars['String']['output'];
};

export type WidgetStartPayloadFailureErrorDetails = MutationProblemDetails & {
  readonly __typename?: 'WidgetStartPayloadFailureErrorDetails';
  readonly key: Scalars['String']['output'];
  readonly value: Scalars['String']['output'];
};

export enum WidgetStartPayloadFailureStatus {
  InternalError = 'INTERNAL_ERROR',
  InvalidState = 'INVALID_STATE',
}

export type WidgetStartPayloadSuccess = {
  readonly __typename?: 'WidgetStartPayloadSuccess';
  readonly id: Scalars['UUID']['output'];
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
  WidgetCreatePayload: (Omit<WidgetCreatePayloadFailure, 'errors'> & { errors: ReadonlyArray<_RefType['WidgetCreatePayloadFailureError']> }) | (Omit<WidgetCreatePayloadSuccess, 'id'> & { id: _RefType['UUID'] });
  WidgetStartPayload: (Omit<WidgetStartPayloadFailure, 'errors'> & { errors: ReadonlyArray<_RefType['WidgetStartPayloadFailureError']> }) | (Omit<WidgetStartPayloadSuccess, 'id'> & { id: _RefType['UUID'] });
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  MutationProblem: (Omit<WidgetCreatePayloadFailureError, 'details'> & { details: ReadonlyArray<_RefType['MutationProblemDetails']> }) | (Omit<WidgetStartPayloadFailureError, 'details'> & { details: ReadonlyArray<_RefType['MutationProblemDetails']> });
  MutationProblemDetails: WidgetCreatePayloadFailureErrorDetails | WidgetStartPayloadFailureErrorDetails;
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
  Widget: ResolverTypeWrapper<Omit<Widget, 'created' | 'id' | 'modified'> & { created: ResolversTypes['Instant']; id: ResolversTypes['UUID']; modified: ResolversTypes['Instant'] }>;
  WidgetCreateInput: WidgetCreateInput;
  WidgetCreatePayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['WidgetCreatePayload']>;
  WidgetCreatePayloadFailure: ResolverTypeWrapper<Omit<WidgetCreatePayloadFailure, 'errors'> & { errors: ReadonlyArray<ResolversTypes['WidgetCreatePayloadFailureError']> }>;
  WidgetCreatePayloadFailureError: ResolverTypeWrapper<Omit<WidgetCreatePayloadFailureError, 'details'> & { details: ReadonlyArray<ResolversTypes['MutationProblemDetails']> }>;
  WidgetCreatePayloadFailureErrorDetails: ResolverTypeWrapper<WidgetCreatePayloadFailureErrorDetails>;
  WidgetCreatePayloadFailureStatus: WidgetCreatePayloadFailureStatus;
  WidgetCreatePayloadSuccess: ResolverTypeWrapper<Omit<WidgetCreatePayloadSuccess, 'id'> & { id: ResolversTypes['UUID'] }>;
  WidgetFeed: ResolverTypeWrapper<WidgetFeed>;
  WidgetGetInput: WidgetGetInput;
  WidgetMutations: ResolverTypeWrapper<Omit<WidgetMutations, 'create' | 'start'> & { create: ResolversTypes['WidgetCreatePayload']; start: ResolversTypes['WidgetStartPayload'] }>;
  WidgetQueries: ResolverTypeWrapper<WidgetQueries>;
  WidgetSearchInput: WidgetSearchInput;
  WidgetStartInput: WidgetStartInput;
  WidgetStartPayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['WidgetStartPayload']>;
  WidgetStartPayloadFailure: ResolverTypeWrapper<Omit<WidgetStartPayloadFailure, 'errors'> & { errors: ReadonlyArray<ResolversTypes['WidgetStartPayloadFailureError']> }>;
  WidgetStartPayloadFailureError: ResolverTypeWrapper<Omit<WidgetStartPayloadFailureError, 'details'> & { details: ReadonlyArray<ResolversTypes['MutationProblemDetails']> }>;
  WidgetStartPayloadFailureErrorDetails: ResolverTypeWrapper<WidgetStartPayloadFailureErrorDetails>;
  WidgetStartPayloadFailureStatus: WidgetStartPayloadFailureStatus;
  WidgetStartPayloadSuccess: ResolverTypeWrapper<Omit<WidgetStartPayloadSuccess, 'id'> & { id: ResolversTypes['UUID'] }>;
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
  Widget: Omit<Widget, 'created' | 'id' | 'modified'> & { created: ResolversParentTypes['Instant']; id: ResolversParentTypes['UUID']; modified: ResolversParentTypes['Instant'] };
  WidgetCreateInput: WidgetCreateInput;
  WidgetCreatePayload: ResolversUnionTypes<ResolversParentTypes>['WidgetCreatePayload'];
  WidgetCreatePayloadFailure: Omit<WidgetCreatePayloadFailure, 'errors'> & { errors: ReadonlyArray<ResolversParentTypes['WidgetCreatePayloadFailureError']> };
  WidgetCreatePayloadFailureError: Omit<WidgetCreatePayloadFailureError, 'details'> & { details: ReadonlyArray<ResolversParentTypes['MutationProblemDetails']> };
  WidgetCreatePayloadFailureErrorDetails: WidgetCreatePayloadFailureErrorDetails;
  WidgetCreatePayloadSuccess: Omit<WidgetCreatePayloadSuccess, 'id'> & { id: ResolversParentTypes['UUID'] };
  WidgetFeed: WidgetFeed;
  WidgetGetInput: WidgetGetInput;
  WidgetMutations: Omit<WidgetMutations, 'create' | 'start'> & { create: ResolversParentTypes['WidgetCreatePayload']; start: ResolversParentTypes['WidgetStartPayload'] };
  WidgetQueries: WidgetQueries;
  WidgetSearchInput: WidgetSearchInput;
  WidgetStartInput: WidgetStartInput;
  WidgetStartPayload: ResolversUnionTypes<ResolversParentTypes>['WidgetStartPayload'];
  WidgetStartPayloadFailure: Omit<WidgetStartPayloadFailure, 'errors'> & { errors: ReadonlyArray<ResolversParentTypes['WidgetStartPayloadFailureError']> };
  WidgetStartPayloadFailureError: Omit<WidgetStartPayloadFailureError, 'details'> & { details: ReadonlyArray<ResolversParentTypes['MutationProblemDetails']> };
  WidgetStartPayloadFailureErrorDetails: WidgetStartPayloadFailureErrorDetails;
  WidgetStartPayloadSuccess: Omit<WidgetStartPayloadSuccess, 'id'> & { id: ResolversParentTypes['UUID'] };
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
  __resolveType: TypeResolveFn<'WidgetCreatePayloadFailureError' | 'WidgetStartPayloadFailureError', ParentType, ContextType>;
  details?: Resolver<ReadonlyArray<ResolversTypes['MutationProblemDetails']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationProblemDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationProblemDetails'] = ResolversParentTypes['MutationProblemDetails']> = {
  __resolveType: TypeResolveFn<'WidgetCreatePayloadFailureErrorDetails' | 'WidgetStartPayloadFailureErrorDetails', ParentType, ContextType>;
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
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  modified?: Resolver<ResolversTypes['Instant'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetCreatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetCreatePayload'] = ResolversParentTypes['WidgetCreatePayload']> = {
  __resolveType: TypeResolveFn<'WidgetCreatePayloadFailure' | 'WidgetCreatePayloadSuccess', ParentType, ContextType>;
};

export type WidgetCreatePayloadFailureResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetCreatePayloadFailure'] = ResolversParentTypes['WidgetCreatePayloadFailure']> = {
  errors?: Resolver<ReadonlyArray<ResolversTypes['WidgetCreatePayloadFailureError']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['WidgetCreatePayloadFailureStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetCreatePayloadFailureErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetCreatePayloadFailureError'] = ResolversParentTypes['WidgetCreatePayloadFailureError']> = {
  details?: Resolver<ReadonlyArray<ResolversTypes['MutationProblemDetails']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetCreatePayloadFailureErrorDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetCreatePayloadFailureErrorDetails'] = ResolversParentTypes['WidgetCreatePayloadFailureErrorDetails']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetCreatePayloadSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetCreatePayloadSuccess'] = ResolversParentTypes['WidgetCreatePayloadSuccess']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetFeedResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetFeed'] = ResolversParentTypes['WidgetFeed']> = {
  cursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  items?: Resolver<ReadonlyArray<ResolversTypes['Widget']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetMutations'] = ResolversParentTypes['WidgetMutations']> = {
  create?: Resolver<ResolversTypes['WidgetCreatePayload'], ParentType, ContextType, RequireFields<WidgetMutations_CreateArgs, 'input'>>;
  start?: Resolver<ResolversTypes['WidgetStartPayload'], ParentType, ContextType, RequireFields<WidgetMutations_StartArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetQueries'] = ResolversParentTypes['WidgetQueries']> = {
  get?: Resolver<Maybe<ResolversTypes['Widget']>, ParentType, ContextType, RequireFields<WidgetQueries_GetArgs, 'input'>>;
  search?: Resolver<ResolversTypes['WidgetFeed'], ParentType, ContextType, RequireFields<WidgetQueries_SearchArgs, 'input'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetStartPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetStartPayload'] = ResolversParentTypes['WidgetStartPayload']> = {
  __resolveType: TypeResolveFn<'WidgetStartPayloadFailure' | 'WidgetStartPayloadSuccess', ParentType, ContextType>;
};

export type WidgetStartPayloadFailureResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetStartPayloadFailure'] = ResolversParentTypes['WidgetStartPayloadFailure']> = {
  errors?: Resolver<ReadonlyArray<ResolversTypes['WidgetStartPayloadFailureError']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['WidgetStartPayloadFailureStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetStartPayloadFailureErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetStartPayloadFailureError'] = ResolversParentTypes['WidgetStartPayloadFailureError']> = {
  details?: Resolver<ReadonlyArray<ResolversTypes['MutationProblemDetails']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetStartPayloadFailureErrorDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetStartPayloadFailureErrorDetails'] = ResolversParentTypes['WidgetStartPayloadFailureErrorDetails']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetStartPayloadSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetStartPayloadSuccess'] = ResolversParentTypes['WidgetStartPayloadSuccess']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
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
  WidgetCreatePayload?: WidgetCreatePayloadResolvers<ContextType>;
  WidgetCreatePayloadFailure?: WidgetCreatePayloadFailureResolvers<ContextType>;
  WidgetCreatePayloadFailureError?: WidgetCreatePayloadFailureErrorResolvers<ContextType>;
  WidgetCreatePayloadFailureErrorDetails?: WidgetCreatePayloadFailureErrorDetailsResolvers<ContextType>;
  WidgetCreatePayloadSuccess?: WidgetCreatePayloadSuccessResolvers<ContextType>;
  WidgetFeed?: WidgetFeedResolvers<ContextType>;
  WidgetMutations?: WidgetMutationsResolvers<ContextType>;
  WidgetQueries?: WidgetQueriesResolvers<ContextType>;
  WidgetStartPayload?: WidgetStartPayloadResolvers<ContextType>;
  WidgetStartPayloadFailure?: WidgetStartPayloadFailureResolvers<ContextType>;
  WidgetStartPayloadFailureError?: WidgetStartPayloadFailureErrorResolvers<ContextType>;
  WidgetStartPayloadFailureErrorDetails?: WidgetStartPayloadFailureErrorDetailsResolvers<ContextType>;
  WidgetStartPayloadSuccess?: WidgetStartPayloadSuccessResolvers<ContextType>;
};
