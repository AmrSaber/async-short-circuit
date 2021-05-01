const faker = require('faker');

const { asyncAnd } = require('../src/index');
const {
  getRandomBooleanPromises,
  createTimedPromise,
} = require('./common');

describe('UNIT For asyncAnd', () => {
  it('performs AND operation over the given promises', done => {
    const { booleans, promises } = getRandomBooleanPromises();

    asyncAnd(promises).then(value => {
      const expectedValue = booleans.reduce((a, b) => a && b);
      expect(value).toBe(expectedValue);
      done();
    });
  });

  it('returns the first falsy value that is resolves', done => {
    const promises = [
      createTimedPromise('', 1),
      createTimedPromise(null, 0.5),
      createTimedPromise(true, 0.5),
    ];

    asyncAnd(promises).then(value => {
      expect(value).toEqual(null);
      done();
    });
  });

  it('returns the result of ANDing all the resolved value if none of them is falsy', done => {
    const promises = [
      createTimedPromise('some-string', 0.1),
      createTimedPromise(true, 0.1),
      createTimedPromise(1, 0.1),
    ];

    asyncAnd(promises).then(value => {
      expect(value).toEqual(1); // ANDing several truthy values returns the last value
      done();
    });
  });

  /**
   * This test creates 4 promises, 2 of them resolve with true and the other 2 resolve with false
   * And tests that asyncAnd resolves when the first promise that resolves with false is resolved.
   */
  it('performs short-circuit logic', done => {
    const values = faker.helpers.shuffle([0, 0, 1, 1]);
    const promisesData = values.map((value, i) => {
      const promise = createTimedPromise(value, (i + 1) * 2);

      let isPromiseDone = false;
      promise.then(() => { isPromiseDone = true; });

      const isDone = () => isPromiseDone;

      return { promise, value, isDone };
    });

    asyncAnd(promisesData.map(d => d.promise)).then(result => {
      expect(result).toBeFalsy();

      const positionOfFirstFalse = promisesData.findIndex(({ value }) => value == false);

      // Assert that it short-circuited on the first false
      promisesData.forEach((promiseData, i) => {
        if (i <= positionOfFirstFalse) {
          expect(promiseData.isDone()).toBeTruthy();
        } else {
          expect(promiseData.isDone()).toBeFalsy();
        }
      });

      done();
    });
  }, 10 * 1000);
});
