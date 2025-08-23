import type { IRules } from 'graphql-shield';
import { WidgetRules } from '../../../features/widget/WidgetApiRules';

export const modulePermissions: IRules[] = [WidgetRules];
