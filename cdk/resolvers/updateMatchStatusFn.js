import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----update start-----');
  const { matchStatusId } = ctx.args;
  const input = ctx.args.input;
  let expressionTxt = 'SET ';
  let expressionNames = {};
  let expressionValues = {};

  const attributes = ['player1Id', 'player1Lp', 'player1Cost', 'player1MaxLp', 'player1MaxCost', 'player1field', 'player1Hand', 'player1Deck', 'player1Discard', 'player2Id', 'player2Lp', 'player2Cost', 'player2MaxLp', 'player2MaxCost', 'player2field', 'player2Hand', 'player2Deck', 'player2Discard', 'turnCount', 'firstPlayerId', 'winnerId'];

  for (const key of attributes) {
    if (input[key] !== undefined && input[key] !== null) {
      expressionTxt += `#${key} = :${key},`;
      expressionNames[`#${key}`] = key;
      expressionValues[`:${key}`] = util.dynamodb.toMapValues({[key]: input[key]})[key];
    }
  }

  expressionTxt = expressionTxt.substring(0, expressionTxt.length - 1);

  return {
    operation: 'UpdateItem',
    key: util.dynamodb.toMapValues({ id: matchStatusId, type: 'MatchStatus' }),
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