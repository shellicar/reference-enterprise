import { type HttpHandler, app } from '@azure/functions';

const handler: HttpHandler = () => {
  return {
    status: 501,
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

app.http('GraphQL', {
  handler,
  methods: ['POST', 'GET'],
  authLevel: 'anonymous',
});
