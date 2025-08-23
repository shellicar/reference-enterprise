import { IWidgetGetResolver } from './interfaces';

export class WidgetGetResolver extends IWidgetGetResolver {
  public query(input: WidgetGetInput): Promise<Widget | null> {
    throw new Error('Method not implemented.');
  }
}
