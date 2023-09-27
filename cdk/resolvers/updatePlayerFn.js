import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----update start-----');
  const { playerId } = ctx.args.playerId;
  const { username, exp, level, ownedCards, ownedDecks } = ctx.args.input
  let expressionTxt = 'SET ';
  let expressionNames = {};
  let expressionValues = {};

  if (!!username) {
    expressionTxt += '#username = :username,';
    expressionNames['#username'] = 'username';
    expressionValues[':username'] = { 'S': username }
  }

  if (!!exp) {
    expressionTxt += '#exp = :exp,';
    expressionNames['#exp'] = 'exp';
    expressionValues[':exp'] = { 'N': exp }
  }

  if (!!level) {
    expressionTxt += '#level = :level,';
    expressionNames['#level'] = 'level';
    expressionValues[':level'] = { 'N': level }
  }

  if (!!ownedCards) {
    expressionTxt += '#ownedCards = :ownedCards,';
    expressionNames['#ownedCards'] = 'ownedCards';
    expressionValues[':ownedCards'] = { 'L': ownedCards }
  }

  if (!!ownedDecks) {
    expressionTxt += '#ownedDecks = :ownedDecks,';
    expressionNames['#ownedDecks'] = 'ownedDecks';
    expressionValues[':ownedDecks'] = { 'L': ownedDecks }
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