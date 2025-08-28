import { type IServiceCollection, IServiceModule } from '@shellicar/core-di';
import { IWidgetCreateResolver, IWidgetGetResolver, IWidgetSearchResolver, IWidgetStartResolver } from './interfaces';
import { WidgetCreateResolver } from './WidgetCreateResolver';
import { WidgetGetResolver } from './WidgetGetResolver';
import { WidgetSearchResolver } from './WidgetSearchResolver';
import { WidgetStartResolver } from './WidgetStartResolver';

export class WidgetModule extends IServiceModule {
  public registerServices(services: IServiceCollection): void {
    services.register(IWidgetGetResolver).to(WidgetGetResolver);
    services.register(IWidgetSearchResolver).to(WidgetSearchResolver);
    services.register(IWidgetCreateResolver).to(WidgetCreateResolver);
    services.register(IWidgetStartResolver).to(WidgetStartResolver);
  }
}
