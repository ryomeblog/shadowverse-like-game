import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----update start-----');
  const { playerId } = ctx.args;
  const input = ctx.args.input;
  let expressionTxt = 'SET ';
  let expressionNames = {};
  let expressionValues = {};

  const attributes = ['username', 'exp', 'ownedCards', 'ownedDecks'];

  for (const key of attributes) {
    if (input[key]) {
      expressionTxt += `#${key} = :${key},`;
      expressionNames[`#${key}`] = key;
      expressionValues[`:${key}`] = util.dynamodb.toMapValues(input[key]);
    }
  }

  expressionTxt = expressionTxt.substring(0, expressionTxt.length - 1);

  return {
    operation: 'UpdateItem',
    key: util.dynamodb.toMapValues({ playerId }),
    update: {
      expression: expressionTxt,
      expressionNames: expressionNames,
      expressionValues: expressionValues,
    },
  };
}
export function response(ctx) {
  console.log('-----update end-----');
  return ctx.result;
}