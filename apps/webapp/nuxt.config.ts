import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  imports: {
    autoImport: false,
  },
  devtools: { enabled: true },
  devServer: {
    port: 3000,
  },
  extends: ['@shellicar-reference-enterprise/ui'],
  telemetry: {
    enabled: false,
  },
});
