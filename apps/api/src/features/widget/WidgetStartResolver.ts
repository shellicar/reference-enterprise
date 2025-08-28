import type { WidgetStartInput, WidgetStartPayload } from '../../generated/server';
import { IWidgetStartResolver } from './interfaces';

export class WidgetStartResolver extends IWidgetStartResolver {
  public mutate(input: WidgetStartInput): Promise<WidgetStartPayload> {
    throw new Error('Method not implemented.');
  }
}
