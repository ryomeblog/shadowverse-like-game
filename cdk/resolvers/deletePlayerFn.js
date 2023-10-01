import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----start-----');
  return {
    operation: 'DeleteItem',
    key: util.dynamodb.toMapValues({ id: ctx.identity.sub, type: 'Player' }),
  };
}
export function response(ctx) {
  console.log('-----end-----');
  return ctx.result;
}