import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----start-----');
  let expressionTxt = '#type = :type';
  let expressionNames = {};
  let expressionValues = {};

  expressionTxt += '#type = :type';
  expressionNames['#type'] = 'type';
  expressionValues[':type'] = util.dynamodb.toMapValues('MatchHistory');

  return {
    operation: 'Query',
    query: {
      expression: expressionTxt,
      expressionNames: expressionNames,
      expressionValues: expressionValues,
    },
  };
}
export function response(ctx) {
  console.log('-----end-----');
  return ctx.result;
}