import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----start-----');
  const { playerId } = ctx.args;
  return {
    operation: 'DeleteItem',
    key: util.dynamodb.toMapValues({ playerId }),
  };
}
export function response(ctx) {
  console.log('-----end-----');
  return ctx.result;
}