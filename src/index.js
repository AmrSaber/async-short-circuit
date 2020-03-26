/**
 * Performs logical AND among the given promises with short-circuit logic.
 * Once one of the promises return false, the returning promise will resolve with false, ignoring the other promises.
 * If all the promises return true, the function will return true.
 *
 * @param {[Promise]} promises
 *
 * @returns {Promise<Boolean>}
 */
function asyncAnd(promises) {
  return new Promise((resolve, reject) => {
    const notify = value => { if (value == false) { resolve(false); } };

    promises.forEach(promise => promise.then(notify));

    Promise
      .all(promises)
      .then(values => {
        const booleanAnd = values.reduce((a, b) => a && b);
        resolve(Boolean(booleanAnd));
      })
      .catch(reject);
  });
}

/**
 * Performs logical OR among the given promises with short-circuit logic.
 * Once one of the promises return true, the returning promise will resolve with true, ignoring the other promises.
 * If all the promises return false, the function will return false.
 *
 * @param {[Promise]} promises
 *
 * @returns {Promise<Boolean>}
 */
function asyncOr(promises) {
  return new Promise((resolve, reject) => {
    const notify = value => { if (value == true) { resolve(true); } };

    promises.forEach(promise => promise.then(notify));

    Promise
      .all(promises)
      .then(values => {
        const booleanOr = values.reduce((a, b) => a || b);
        resolve(Boolean(booleanOr));
      })
      .catch(reject);
  });
}

module.exports = { asyncAnd, asyncOr };
