import type { IWidgetCreateResolver } from './interfaces';

export class WidgetCreateResolver implements IWidgetCreateResolver {
  public mutate(input: WidgetCreateInput): Promise<WidgetCreatePayload> {
    throw new Error('Method not implemented.');
  }
}
