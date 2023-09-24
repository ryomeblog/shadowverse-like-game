import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----start-----');
  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues({ id: ctx.args.matchStatusId }),
  };
}
export function response(ctx) {
  console.log('-----end-----');
  return ctx.result;
}