/**
 * Performs logical AND among the given promises with short-circuit logic.
 * Returns the result of ANDing the results of all the given promises,
 * but stops as soon as the first false value is resolved and returns that value.
 *
 * Note that this considers the resolve time precedence and not the promises order,
 * unless all the promises resolve to true, then it will consider the order to perform the AND manually.
 *
 * @param promises
 *
 * @returns a promise that resolves with the result of ANDing the given promises.
 */
export function asyncAnd(promises: Promise<any>[]): Promise<any>;


/**
 * Performs logical AND among the given promises with short-circuit logic.
 * Returns the result of ANDing the results of all the given promises,
 * but stops as soon as the first false value is resolved and returns that value.
 *
 * Note that this considers the resolve time precedence and not the promises order,
 * unless all the promises resolve to true, then it will consider the order to perform the AND manually.
 *
 * @param promises
 *
 * @returns a promise that resolves with the result of ORing the given promises.
 */
export function asyncOr(promises: Promise<any>[]): Promise<any>;
