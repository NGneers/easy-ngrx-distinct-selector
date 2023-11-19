import { MemoizedProjection } from '@ngrx/store';

import { EqualsFn, defaultArrayEqualsFn, defaultEqualsFn } from './is-equal';

export type TypedMemoizedProjection<
  TArgs extends unknown[] = unknown[],
  TResult = unknown,
> = MemoizedProjection & {
  memoized: (...args: TArgs) => TResult;
  setResult: (result?: TResult) => void;
};

/**
 * Uses the same logic as the `defaultMemoize` function from `@ngrx/store`.
 * The difference is that the `isArgumentsEqual` function is now called only once with the previous and current arguments instead of once for each argument.
 * This enables us to write better TypeScript types for the `isArgumentsEqual` function.
 *
 * @see https://ngrx.io/api/store/defaultMemoize
 */
export function typeFriendlyDefaultMemoize<TArgs extends unknown[] = unknown[], TResult = unknown>(
  projectionFn: (...args: TArgs) => TResult,
  isArgumentsEqual: EqualsFn<TArgs> = defaultArrayEqualsFn,
  isResultEqual: EqualsFn<TResult> = defaultEqualsFn
): TypedMemoizedProjection<TArgs, TResult> {
  let lastArguments: TArgs | null = null;
  let lastResult: TResult | null = null;
  let overrideResult: { result: TResult } | undefined;

  function reset() {
    lastArguments = null;
    lastResult = null;
  }

  function setResult(result?: TResult) {
    overrideResult = result === undefined ? undefined : { result };
  }

  function clearResult() {
    overrideResult = undefined;
  }

  function memoized(...args: TArgs): TResult {
    if (overrideResult !== undefined) {
      return overrideResult.result;
    }

    if (!lastArguments) {
      lastResult = projectionFn(...args);
      lastArguments = args;
      return lastResult;
    }

    if (isArgumentsEqual(args, lastArguments)) {
      return lastResult as TResult;
    }

    const newResult = projectionFn(...args);
    lastArguments = args;

    if (isResultEqual(lastResult as TResult, newResult)) {
      return lastResult as TResult;
    }

    lastResult = newResult;

    return newResult;
  }

  return { memoized, reset, setResult, clearResult };
}
