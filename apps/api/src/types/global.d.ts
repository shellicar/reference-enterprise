/**
 * @fileoverview Global ambient type declarations for API project
 * @description Global type declarations that TypeScript automatically picks up
 * @author Stephen Hellicar
 */

declare module '@modules/generated' {
  interface IServiceModule {
    // Define the interface inline to avoid import issues
  }

  export const modules: IServiceModule[];

  const _default: {
    modules: IServiceModule[];
  };
  export default _default;
}
