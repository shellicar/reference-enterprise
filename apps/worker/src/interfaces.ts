export abstract class IWorkerModule implements AsyncDisposable, Disposable {
  public abstract start(): Promise<void>;
  public abstract [Symbol.dispose](): void;
  public abstract [Symbol.asyncDispose](): Promise<void>;
}
