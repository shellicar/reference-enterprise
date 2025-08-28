import type { CodegenConfig } from '@graphql-codegen/cli';
import type { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import type { TypeScriptResolversPluginConfig } from '@graphql-codegen/typescript-resolvers';

type ConfigOptions = TypeScriptResolversPluginConfig & TypeScriptPluginConfig;

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/**/*.graphql',
  generates: {
    'src/generated/server.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        addUnderscoreToArgsType: true,
        allowEnumStringTypes: false,
        constEnums: false,
        enumPrefix: false,
        enumsAsTypes: false,
        enumSuffix: false,
        extractAllFieldsToTypes: true,
        immutableTypes: true,
        nonOptionalTypename: false,
        optionalResolveType: false,
        printFieldsOnNewLines: true,
        resolversNonOptionalTypename: false,
        skipTypename: false,
        strictScalars: true,
        useTypeImports: true,
        scalars: {
          Cursor: {
            input: 'string',
            output: 'string',
          },
          Instant: {
            input: 'Instant',
            output: 'Instant',
          },
          UUID: {
            input: 'UUID',
            output: 'UUID',
          },
        },
        mappers: {
          UUID: 'node:crypto#UUID',
          Instant: '@js-joda/core#Instant',
        },
      } satisfies ConfigOptions,
    },
  },
};
export default config;
