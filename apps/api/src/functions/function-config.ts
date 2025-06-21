import { type HttpHandler, app } from '@azure/functions';

const handler: HttpHandler = () => {
  return {
    status: 200,
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

app.http('Config', {
  handler,
  methods: ['GET'],
  authLevel: 'anonymous',
});
