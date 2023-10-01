/**
 * Sends a request to the attached data source
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the request
 */
export function request(ctx) {
    // Update with custom logic or select a code sample.
    return {
        operation: 'GetItem',
        key: util.dynamodb.toMapValues({ id: ctx.args.matchStatusId, type: 'MatchStatus' }),
    }
}

/**
 * Returns the resolver result
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the result
 */
export function response(ctx) {
    // Update with response logic
    return ctx.result
}
