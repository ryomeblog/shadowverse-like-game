import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----Main start-----');
  return {};
}
export function response(ctx) {
  console.log('-----Main end-----');
  return ctx.prev.result;
}