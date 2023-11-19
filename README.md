[![npm](https://img.shields.io/npm/v/@ngneers/easy-ngrx-distinct-selector?color=%2300d26a&style=for-the-badge)](https://www.npmjs.com/package/@ngneers/easy-ngrx-distinct-selector)
[![Build Status](https://img.shields.io/github/actions/workflow/status/NGneers/easy-ngrx-distinct-selector/build.yml?branch=main&style=for-the-badge)](https://github.com/NGneers/easy-ngrx-distinct-selector/actions/workflows/build.yml)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@ngneers/easy-ngrx-distinct-selector?color=%23FF006F&label=Bundle%20Size&style=for-the-badge)](https://bundlephobia.com/package/@ngneers/easy-ngrx-distinct-selector)

# easy-ngrx-distinct-selector

Provides functions to easily create @ngrx/store selectors with equal functions for arguments and result values.

## Motivation 💥

When using @ngrx/store, selectors are often used to transform the state into a more usable form.
The default way of creating such selectors is using the `createSelector` function, which automatically adds the `defaultMemoize` to the selector to prevent unnecessary recomputations.

If the data structure is a bit more complex one either needs to use the `createSelectorFactory` to be able to configure the memoize function or the `equals` (Signals) or `distinctUntilChanged` (RxJs Observables) functionalities need to be used when the selector is consumed.

The prior makes a lot more sense, as the logic should likely be shared between all consumers of the selector, but it is not as easy to use as the latter.

## Features 🔥

✅ Easy to setup and use

✅ Type safe memoize functions

✅ ESM & CJS exports

This library provides a way to easily create selectors with custom memoize functions, which are automatically used when the selector is consumed.

## Built With 🔧

- [TypeScript](https://www.typescriptlang.org/)

## Usage Example 🚀

```ts
import { createDistinctSelector } from 'easy-ngrx-distinct-selector';

import { AppState } from './app.state';

// By default the selector behaves just like `createSelector`
// Meaning that the memoize functions use the equality operator (===)
const selectBookCount1 = createDistinctSelector(
  (state: AppState) => state.book,
  book => book.count
);

// With custom result equality function
const selectBookNames = createDistinctSelector(
  (state: AppState) => state.book,
  book => book.names,
  { resultEqual: (oldNames, newNames) => arraysEqual(oldNames, newNames) }
);

// With custom arguments equality function
// `argsEqual` is different than `defaultMemoize` as it is only called once
// per selector call with all arguments instead of once per argument to improve type safety
const selectFilteredBookNames1 = createDistinctSelector(
  (state: AppState) => state.book.names,
  (state: AppState) => state.book.filter,
  (names, filter) => names.filter(name => name.includes(filter)),
  {
    argsEqual: ([oldNames, oldFilter], [newNames, newFilter]) => {
      return arraysEqual(oldNames, newNames) && oldFilter === newFilter;
    },
  }
);

// Parameterized selectors are also supported
function selectFilteredBookNames2(props: { filter: string }) {
  return createDistinctSelector(
    (state: AppState) => state.book.names,
    names => names.filter(name => name.includes(props.filter)),
    {
      argsEqual: ([oldNames], [newNames]) => {
        return arraysEqual(oldNames, newNames);
      },
    }
  );
}

// Unlike `createSelector `, `createDistinctSelector` also accepts direct projection of the state
const selectBookCount2 = createDistinctSelector((state: AppState) => state.book.count);

// ... that also supports custom memoize functions
const selectBookCount3 = createDistinctSelector((state: AppState) => state.book.count, {
  argsEqual: ([oldState], [newState]) => oldState.book.count === newState.book.count,
});

// Utility functions for selectors
function arraysEqual<T>(oldArray: T[], newArray: T[]): boolean {
  return (
    oldArray.length !== newArray.length &&
    oldArray.every((value, index) => value === newArray[index])
  );
}
```

## Contributing 🧑🏻‍💻

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 🔑

Distributed under the MIT License. See `LICENSE.txt` for more information.
