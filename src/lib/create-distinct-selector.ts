import { MemoizedSelector, Selector, createSelectorFactory } from '@ngrx/store';

import { EqualsFn } from './is-equal';
import { typeFriendlyDefaultMemoize } from './type-friendly-default-memoize';

export type DistinctSelectorOptions<TArgs extends unknown[], TResult> = {
  resultEqual?: EqualsFn<TResult>;
  argsEqual?: EqualsFn<TArgs>;
};
export type DistinctSelector<TState, TArgs extends unknown[], TResult> = MemoizedSelector<
  TState,
  TResult,
  (...args: TArgs) => TResult
>;

export function createDistinctSelector<TState, TResult>(
  projector: (state: TState) => TResult,
  options?: DistinctSelectorOptions<[TState], TResult>
): DistinctSelector<TState, [TState], TResult>;
export function createDistinctSelector<TState, S1, TResult>(
  s1: Selector<TState, S1>,
  projector: (s1: S1) => TResult,
  options?: DistinctSelectorOptions<[S1], TResult>
): DistinctSelector<TState, [S1], TResult>;
export function createDistinctSelector<TState, S1, S2, TResult>(
  s1: Selector<TState, S1>,
  s2: Selector<TState, S2>,
  projector: (s1: S1, s2: S2) => TResult,
  options?: DistinctSelectorOptions<[S1, S2], TResult>
): DistinctSelector<TState, [S1, S2], TResult>;
export function createDistinctSelector<TState, S1, S2, S3, TResult>(
  s1: Selector<TState, S1>,
  s2: Selector<TState, S2>,
  s3: Selector<TState, S3>,
  projector: (s1: S1, s2: S2, s3: S3) => TResult,
  options?: DistinctSelectorOptions<[S1, S2, S3], TResult>
): DistinctSelector<TState, [S1, S2, S3], TResult>;
export function createDistinctSelector<TState, S1, S2, S3, S4, TResult>(
  s1: Selector<TState, S1>,
  s2: Selector<TState, S2>,
  s3: Selector<TState, S3>,
  s4: Selector<TState, S4>,
  projector: (s1: S1, s2: S2, s3: S3, s4: S4) => TResult,
  options?: DistinctSelectorOptions<[S1, S2, S3, S4], TResult>
): DistinctSelector<TState, [S1, S2, S3, S4], TResult>;
export function createDistinctSelector<TState, S1, S2, S3, S4, S5, TResult>(
  s1: Selector<TState, S1>,
  s2: Selector<TState, S2>,
  s3: Selector<TState, S3>,
  s4: Selector<TState, S4>,
  s5: Selector<TState, S5>,
  projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5) => TResult,
  options?: DistinctSelectorOptions<[S1, S2, S3, S4, S5], TResult>
): DistinctSelector<TState, [S1, S2, S3, S4, S5], TResult>;
export function createDistinctSelector<TState, S1, S2, S3, S4, S5, S6, TResult>(
  s1: Selector<TState, S1>,
  s2: Selector<TState, S2>,
  s3: Selector<TState, S3>,
  s4: Selector<TState, S4>,
  s5: Selector<TState, S5>,
  s6: Selector<TState, S6>,
  projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6) => TResult,
  options?: DistinctSelectorOptions<[S1, S2, S3, S4, S5, S6], TResult>
): DistinctSelector<TState, [S1, S2, S3, S4, S5, S6], TResult>;
export function createDistinctSelector<TState, S1, S2, S3, S4, S5, S6, S7, TResult>(
  s1: Selector<TState, S1>,
  s2: Selector<TState, S2>,
  s3: Selector<TState, S3>,
  s4: Selector<TState, S4>,
  s5: Selector<TState, S5>,
  s6: Selector<TState, S6>,
  s7: Selector<TState, S7>,
  projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7) => TResult,
  options?: DistinctSelectorOptions<[S1, S2, S3, S4, S5, S6, S7], TResult>
): DistinctSelector<TState, [S1, S2, S3, S4, S5, S6, S7], TResult>;
export function createDistinctSelector<TState, S1, S2, S3, S4, S5, S6, S7, S8, TResult>(
  s1: Selector<TState, S1>,
  s2: Selector<TState, S2>,
  s3: Selector<TState, S3>,
  s4: Selector<TState, S4>,
  s5: Selector<TState, S5>,
  s6: Selector<TState, S6>,
  s7: Selector<TState, S7>,
  s8: Selector<TState, S8>,
  projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7, s8: S8) => TResult,
  options?: DistinctSelectorOptions<[S1, S2, S3, S4, S5, S6, S7, S8], TResult>
): DistinctSelector<TState, [S1, S2, S3, S4, S5, S6, S7, S8], TResult>;
export function createDistinctSelector(
  ...input: unknown[]
): DistinctSelector<unknown, unknown[], unknown> {
  const last = input[input.length - 1];
  let options: DistinctSelectorOptions<unknown[], unknown> | undefined = undefined;
  if (typeof last === 'object' && last !== null) {
    options = input.pop() as DistinctSelectorOptions<unknown[], unknown> | undefined;
  }
  if (input.length === 1) {
    input.splice(0, 0, (x: unknown) => x);
  }
  return createSelectorFactory(projector => {
    return typeFriendlyDefaultMemoize(projector, options?.argsEqual, options?.resultEqual);
  })(...input);
}
