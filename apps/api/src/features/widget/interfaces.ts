export abstract class IWidgetGetResolver {
  public abstract query(input: WidgetGetInput): Promise<Widget | null>;
}

export abstract class IWidgetSearchResolver {
  public abstract query(input: WidgetSearchInput): Promise<WidgetFeed>;
}

export abstract class IWidgetCreateResolver {
  public abstract mutate(input: WidgetCreateInput): Promise<WidgetCreatePayload>;
}

export abstract class IWidgetStartResolver {
  public abstract mutate(input: WidgetStartInput): Promise<WidgetStartPayload>;
}
