const faker = require('faker');

/**
 * Generates random boolean values, wraps then into promises
 * then returns the values and the promises.
 *
 * @param {Number} length
 *
 * @returns {{promises: Promise[], booleans: Boolean[]}}
 */
function getRandomBooleanPromises(length = 4) {
  const booleans = [];
  for (let i = 0; i < length; ++i) { booleans.push(faker.datatype.boolean()); }

  const promises = booleans.map(value => new Promise(resolve => resolve(value)));

  return { promises, booleans };
}

/**
 * Returns a promise that resolves with `value` after `seconds` seconds.
 *
 * @param {Any} value
 * @param {Number} seconds
 *
 * @returns {Promise}
 */
function createTimedPromise(value, seconds) {
  return new Promise(resolve => {
    setTimeout(
      () => resolve(value),
      seconds * 1000,
    );
  });
}

module.exports = {
  getRandomBooleanPromises,
  createTimedPromise,
};
