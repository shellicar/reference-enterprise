import type { Widget, WidgetDeleteInput, WidgetDeletePayload, WidgetFeed, WidgetGetInput, WidgetSearchInput } from '../../generated/server';

export abstract class IWidgetGetResolver {
  public abstract query(input: WidgetGetInput): Promise<Widget | null>;
}

export abstract class IWidgetSearchResolver {
  public abstract query(input: WidgetSearchInput): Promise<WidgetFeed>;
}

export abstract class IWidgetDeleteResolver {
  public abstract mutate(input: WidgetDeleteInput): Promise<WidgetDeletePayload>;
}
