/**
 * @fileoverview Ambient type declarations for virtual modules
 * @description Type declarations for auto-generated service module discovery
 * @author Stephen Hellicar
 */

declare module '@modules/generated' {
  import type { ServiceModuleType } from '@shellicar/core-di';
  export const modules: ServiceModuleType[];

  const _default: {
    modules: ServiceModuleType[];
  };
  export default _default;
}
