import { util } from "@aws-appsync/utils";

export function request(ctx) {
    return {
        operation: "Scan",
        filter: {
            expression: "#type = :type and #playerId = :playerId",
            expressionNames: {
                "#type": "type",
                "#playerId": "playerId",
            },
            expressionValues: {
                ":type": { "S": "Deck" },
                ":playerId": { "S": ctx.identity.sub },
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
