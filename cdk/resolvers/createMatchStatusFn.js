import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----start-----');
  const input = ctx.args.input;
  input.type = 'MatchStatus';
  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues({ 'id': util.autoUlid() }),
    attributeValues: util.dynamodb.toMapValues(input),
  };
}
export function response(ctx) {
  console.log('-----end-----');
  return ctx.result;
}