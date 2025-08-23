import type { IResolvers } from '@graphql-tools/utils';
import { WidgetResolver } from '../../../features/widget/WidgetApiResolvers';

// TODO: Use codegen types
export const resolvers: IResolvers[] = [WidgetResolver];
