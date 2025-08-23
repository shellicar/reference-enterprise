import type { HttpHandler } from '@azure/functions';
import version from '@shellicar/build-version/version';

export const handler: HttpHandler = () => {
  return {
    status: 200,
    body: JSON.stringify(version),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
