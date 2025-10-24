import { type IServiceCollection, IServiceModule } from '@shellicar/core-di';
import { IWidgetDeleteResolver, IWidgetGetResolver, IWidgetSearchResolver } from './interfaces';
import { WidgetDeleteResolver } from './WidgetDeleteResolver';
import { WidgetGetResolver } from './WidgetGetResolver';
import { WidgetSearchResolver } from './WidgetSearchResolver';

export class WidgetModule extends IServiceModule {
  public registerServices(services: IServiceCollection): void {
    services.register(IWidgetGetResolver).to(WidgetGetResolver);
    services.register(IWidgetSearchResolver).to(WidgetSearchResolver);
    services.register(IWidgetDeleteResolver).to(WidgetDeleteResolver);
  }
}
