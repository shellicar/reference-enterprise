import { app } from '@azure/functions';

export const myFunc2 = (name: string): void => {
  app.http(name, {
    handler: () => ({}),
  });
};
