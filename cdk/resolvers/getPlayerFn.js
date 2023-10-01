import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----start-----');
  return {
    operation: 'Scan',
    filter: {
      expression: "#id = :id",
      expressionNames: {
        "#id": "id",
      },
      expressionValues: {
        ":id": { "S": ctx.identity.sub },
      }
    }
  };
}
export function response(ctx) {
  console.log('-----end-----');
  return ctx.result.items[0];
}