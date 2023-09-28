import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----start-----');
  const { cardId } = ctx.args;
  return {
    operation: 'DeleteItem',
    key: util.dynamodb.toMapValues({ cardId }),
  };
}
export function response(ctx) {
  console.log('-----end-----');
  return ctx.result;
}