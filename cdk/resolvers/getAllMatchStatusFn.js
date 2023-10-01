import { util } from "@aws-appsync/utils";

export function request(ctx) {
    return {
        operation: "Scan",
        filter: {
            expression: "#type = :type",
            expressionNames: {
                "#type": "type",
            },
            expressionValues: {
                ":type": {"S": "MatchStatus"}
            }
        }
    };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  return ctx.result.items;
}
