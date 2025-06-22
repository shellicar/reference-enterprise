import { type HttpHandler, app } from '@azure/functions';
import version from '@shellicar/build-version/version';
const handler: HttpHandler = () => {
  return {
    status: 200,
    body: JSON.stringify(version),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

app.http('Version', {
  handler,
  methods: ['POST', 'GET'],
  authLevel: 'anonymous',
});
