import type { WidgetDeleteInput, WidgetDeletePayload } from '../../generated/server';
import { IWidgetDeleteResolver } from './interfaces';

export class WidgetDeleteResolver extends IWidgetDeleteResolver {
  public mutate(input: WidgetDeleteInput): Promise<WidgetDeletePayload> {
    throw new Error('Method not implemented.');
  }
}
