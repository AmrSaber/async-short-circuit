/**
 * Performs logical AND among the given promises with short-circuit logic.
 * Returns the result of ANDing the results of all the given promises,
 * but stops as soon as the first false value is resolved and returns that value.
 *
 * Note that this considers the resolve time precedence and not the promises order,
 * unless all the promises resolve to true, then it will consider the order to perform the AND manually.
 *
 * @param {[Promise]} promises
 *
 * @returns {Promise<Any>}
 */
function asyncAnd(promises) {
  return new Promise((resolve, reject) => {
    const notify = value => { if (!value) { resolve(value); } else { return value; } };

    promises.forEach(promise => promise.then(notify));

    Promise
      .all(promises)
      .then(values => { resolve(values.reduce((a, b) => a && b)); })
      .catch(reject);
  });
}

/**
 * Performs logical OR among the given promises with short-circuit logic.
 * Returns the result of ORing the results of all the given promises,
 * but stops as soon as the first truthy value is resolved and returns that value.
 *
 * Note that this considers the resolve time precedence and not the promises order,
 * unless all the promises resolve to false, then it will consider the order to perform the OR manually.
 *
 * @param {[Promise]} promises
 *
 * @returns {Promise<Any>}
 */
function asyncOr(promises) {
  return new Promise((resolve, reject) => {
    const notify = value => { if (value) { resolve(value); } else { return value; } };

    promises.forEach(promise => promise.then(notify));

    Promise
      .all(promises)
      .then(values => { resolve(values.reduce((a, b) => a || b)); })
      .catch(reject);
  });
}

module.exports = { asyncAnd, asyncOr };
