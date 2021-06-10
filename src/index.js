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
