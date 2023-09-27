import { util } from '@aws-appsync/utils';
export function request(ctx) {
  console.log('-----update start-----');
  const { cardId } = ctx.args.cardId;
  const { cardname, cardType, cost, attack, defense, description, effectType, imageUrl } = ctx.args.input
  let expressionTxt = 'SET ';
  let expressionNames = {};
  let expressionValues = {};

  if (!!cardname) {
    expressionTxt += '#cardname = :cardname,';
    expressionNames['#cardname'] = 'cardname';
    expressionValues[':cardname'] = { 'S': cardname }
  }

  if (!!cardType) {
    expressionTxt += '#cardType = :cardType,';
    expressionNames['#cardType'] = 'cardType';
    expressionValues[':cardType'] = { 'S': cardType }
  }

  if (!!cost) {
    expressionTxt += '#cost = :cost,';
    expressionNames['#cost'] = 'cost';
    expressionValues[':cost'] = { 'N': cost }
  }

  if (!!attack) {
    expressionTxt += '#attack = :attack,';
    expressionNames['#attack'] = 'attack';
    expressionValues[':attack'] = { 'N': attack }
  }

  if (!!defense) {
    expressionTxt += '#defense = :defense,';
    expressionNames['#defense'] = 'defense';
    expressionValues[':defense'] = { 'N': defense }
  }

  if (!!description) {
    expressionTxt += '#description = :description,';
    expressionNames['#description'] = 'description';
    expressionValues[':description'] = { 'S': description }
  }

  if (!!effectType) {
    expressionTxt += '#effectType = :effectType,';
    expressionNames['#effectType'] = 'effectType';
    expressionValues[':effectType'] = { 'S': effectType }
  }

  if (!!imageUrl) {
    expressionTxt += '#imageUrl = :imageUrl,';
    expressionNames['#imageUrl'] = 'imageUrl';
    expressionValues[':imageUrl'] = { 'S': imageUrl }
  }

  expressionTxt = expressionTxt.substring(0, expressionTxt.length - 1);

  return {
    operation: 'UpdateItem',
    key: util.dynamodb.toMapValues({ cardId }),
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