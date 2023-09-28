import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----start-----');
  const { deckId } = ctx.args;
  return {
    operation: 'DeleteItem',
    key: util.dynamodb.toMapValues({ deckId }),
  };
}
export function response(ctx) {
  console.log('-----end-----');
  return ctx.result;
}