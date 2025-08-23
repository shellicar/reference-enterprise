import type { IServiceModule } from '@shellicar/core-di';
import { WidgetModule } from '../../features/widget/WidgetApiModule';

export const modules = [WidgetModule] satisfies (typeof IServiceModule)[];
