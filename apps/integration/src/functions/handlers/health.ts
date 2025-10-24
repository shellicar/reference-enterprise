import type { HttpHandler } from '@azure/functions';

export const handler: HttpHandler = () => {
  return {
    status: 200,
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
