import { rules } from '@graphql/generated';
import type { IMiddlewareGenerator } from 'graphql-middleware';
import type { IRule, IRules } from 'graphql-shield';
import { shield } from 'graphql-shield';
import { isDevelopment } from '../isDevelopment';
import { CoreRules } from './DefaultRules';

const mergePermissions = (arr: IRules[]): IRules => {
  const merged: IRules = {};

  for (const obj of arr) {
    for (const [key, value] of Object.entries(obj)) {
      if (!merged[key]) {
        // If the key does not exist in the merged object, set it
        merged[key] = value as IRule;
      } else {
        // If the key already exists, merge the sub-properties
        merged[key] = {
          ...merged[key],
          ...value,
        };
      }
    }
  }

  return merged;
};

const mergedPermissions = mergePermissions([DefaultRules, ...rules]);

export const permissions: IMiddlewareGenerator<any, any, any> = shield(mergedPermissions, {
  allowExternalErrors: isDevelopment,
  debug: isDevelopment,
});
