import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----start-----');
  const { cardId } = ctx.args;
  return {
    operation: 'DeleteItem',
    key: util.dynamodb.toMapValues({id: cardId, type: 'Card'}),
  };
}
export function response(ctx) {
  console.log('-----end-----');
  console.log('ctx', ctx);
  return ctx.result;
}