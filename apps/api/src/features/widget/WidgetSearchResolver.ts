import { IWidgetSearchResolver } from './interfaces';

export class WidgetSearchResolver extends IWidgetSearchResolver {
  public query(input: WidgetSearchInput): Promise<WidgetFeed> {
    throw new Error('Method not implemented.');
  }
}
