export abstract class IWorkerModule {
  public abstract start(): Promise<void>;
  public abstract [Symbol.dispose](): void;
  public abstract [Symbol.asyncDispose](): Promise<void>;
}
