# Async Short Circuit

Performs logical AND and OR operations with short circuit on promises.

Given an array of promises, as soon as a promise whose value can cause a short circuit is resolved, it's value is used and returned and the rest of the promises are ignored.

## Install
`npm i async-short-circuit`

## Usage

```js
const { asyncAnd, asyncOr } = require('async-short-circuit');

// or using import
import { asyncAnd, asyncOr } from 'async-short-circuit';

// Some code ...

// AND
asyncAnd(myPromises).then(value => { /* perform some logic with AND result */ });

// OR
asyncOr(myPromises).then(value => { /* perform some logic with OR result */ });
```

## API
- `asyncAnd(promises): Promise<boolean>`
    - `promises`: an array of `Promise`s.
- `asyncOr(promises): Promise<boolean>`
    - `promises`: an array of `Promise`s.

## Important Notes

### Short Circuit Logic
The given promises are awaited upon, and as soon as one of them resolves, it's value is checked, if its value can cause a short circuit, the returned promise -from short-circuit functions- resolves immediately without waiting for the results of the remaining promises. If the value of the resolved promise does not cause a short circuit, it's ignored and the same logic is applies to other promises.

If none of the promises' values caused a short circuit, then with the resolving of the last promise, the value of the resulting promise is determined and it's resolved with that value (`true` in case of `asyncAnd` and `false` in case of `asyncOr`).

Also note that any short-circuiting does not affect the running of the given promises, all the promises will always run no matter the result, it's just we don't wait for the resolving of the remaining promises if a value is received that causes a short-circuit.

### Boolean Comparison
Boolean comparison is made using coercive equality check (`==` and not `===`), so any value that is equivalent to `true` is considered `true`, and any value that is equivalent to `false` is considered `false`.

### Return Value
The returned value is always `boolean` (`true` or `false`) even if none of the given promises' values is strictly boolean.

## Features Suggestions and Bug Reports
For feature suggestions and/or bug reports, please [open an issue](https://github.com/AmrSaber/async-short-circuit/issues).