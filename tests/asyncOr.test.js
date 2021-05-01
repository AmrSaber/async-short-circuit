const faker = require('faker');

const { asyncOr } = require('../src/index');
const {
  getRandomBooleanPromises,
  createTimedPromise,
} = require('./common');

describe('UNIT For asyncOr', () => {
  it('performs OR operation over the given promises', done => {
    const { booleans, promises } = getRandomBooleanPromises();

    asyncOr(promises).then(value => {
      const expectedValue = booleans.reduce((a, b) => a || b);
      expect(value).toEqual(expectedValue);
      done();
    });
  });

  it('returns the first truthy value that is resolves', done => {
    const promises = [
      createTimedPromise('some-string', 1),
      createTimedPromise(123, 0.5),
      createTimedPromise(false, 0.5),
    ];

    asyncOr(promises).then(value => {
      expect(value).toEqual(123);
      done();
    });
  });

  it('returns the result of ORing all the resolved value if none of them is truthy', done => {
    const promises = [
      createTimedPromise(0, 0.1),
      createTimedPromise(null, 0.1),
      createTimedPromise(false, 0.1),
      createTimedPromise('', 0.1),
    ];

    asyncOr(promises).then(value => {
      expect(value).toEqual(''); // ORing several falsy values returns the last value
      done();
    });
  });

  /**
   * This test creates 4 promises, 2 of them resolve with true and the other 2 resolve with false
   * And tests that asyncOr resolves when the first promise that resolves with true is resolved.
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

    asyncOr(promisesData.map(d => d.promise)).then(result => {
      expect(result).toBeTruthy();

      const positionOfFirstTrue = promisesData.findIndex(({ value }) => value == true);

      // Assert that it short-circuited on the first false
      promisesData.forEach((promiseData, i) => {
        if (i <= positionOfFirstTrue) {
          expect(promiseData.isDone()).toBeTruthy();
        } else {
          expect(promiseData.isDone()).toBeFalsy();
        }
      });

      done();
    });
  }, 10 * 1000);
});
