jest.mock('./is-equal');

import { DistinctSelectorOptions } from './create-distinct-selector';
import { defaultArrayEqualsFn, defaultEqualsFn } from './is-equal';
import { typeFriendlyDefaultMemoize } from './type-friendly-default-memoize';

function createDefaultMemoize(options?: DistinctSelectorOptions<[number], { a: number }>) {
  const projectionFn = jest.fn((a: number) => ({ a }));
  const memoize = typeFriendlyDefaultMemoize(
    projectionFn,
    options?.argsEqual ?? (([a], [b]) => a === b),
    options?.resultEqual ?? ((a, b) => a === b)
  );
  return { projectionFn, memoize };
}

describe('typeFriendlyDefaultMemoize', () => {
  describe('memoized', () => {
    it('should return overrideResult if defined', () => {
      const { projectionFn, memoize } = createDefaultMemoize();

      const fixResult = { a: 4711 };
      memoize.setResult(fixResult);
      const result = memoize.memoized(1);

      expect(projectionFn).not.toHaveBeenCalled();
      expect(result).toBe(fixResult);
    });

    it('should call projectionFn if overrideResult is undefined', () => {
      const { projectionFn, memoize } = createDefaultMemoize();

      const result = memoize.memoized(1);

      expect(projectionFn).toHaveBeenCalledTimes(1);
      expect(result).toBe(projectionFn.mock.results[0].value);
    });

    it('should not call projectionFn if arguments are equal', () => {
      const { projectionFn, memoize } = createDefaultMemoize();

      const result1 = memoize.memoized(1);
      const result2 = memoize.memoized(1);

      expect(projectionFn).toHaveBeenCalledTimes(1);
      expect(result1).toBe(projectionFn.mock.results[0].value);
      expect(result2).toBe(result1);
    });

    it('should return memoized result if results are equal', () => {
      const { projectionFn, memoize } = createDefaultMemoize({ resultEqual: () => true });

      const result1 = memoize.memoized(1);
      const result2 = memoize.memoized(2);

      expect(projectionFn).toHaveBeenCalledTimes(2);
      expect(result1).toBe(projectionFn.mock.results[0].value);
      expect(result2).toBe(result1);
    });

    it('should call projectionFn if arguments and result are not equal', () => {
      const { projectionFn, memoize } = createDefaultMemoize();

      const result1 = memoize.memoized(1);
      const result2 = memoize.memoized(2);

      expect(projectionFn).toHaveBeenCalledTimes(2);
      expect(result1).toBe(projectionFn.mock.results[0].value);
      expect(result2).toBe(projectionFn.mock.results[1].value);
    });

    it('should use defaultEqualsFn and defaultArrayEqualsFn if resultEqual or argsEqual is not defined', () => {
      const projectionFn = jest.fn((a: number) => ({ a }));
      const memoize = typeFriendlyDefaultMemoize(projectionFn);

      memoize.memoized(1);
      memoize.memoized(2);

      expect(projectionFn).toHaveBeenCalledTimes(2);
      expect(defaultEqualsFn).toHaveBeenCalledTimes(1);
      expect(defaultArrayEqualsFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('setResult', () => {
    it('should set overrideResult', () => {
      const { projectionFn, memoize } = createDefaultMemoize();

      const fixResult = { a: 4711 };
      memoize.setResult(fixResult);
      const result = memoize.memoized(1);

      expect(projectionFn).not.toHaveBeenCalled();
      expect(result).toBe(fixResult);
    });

    it('should clear overrideResult if result is undefined', () => {
      const { projectionFn, memoize } = createDefaultMemoize();

      const fixResult = { a: 4711 };
      memoize.setResult(fixResult);
      memoize.setResult();
      const result = memoize.memoized(1);

      expect(projectionFn).toHaveBeenCalledTimes(1);
      expect(result).toBe(projectionFn.mock.results[0].value);
    });
  });

  describe('clearResult', () => {
    it('should clear overrideResult', () => {
      const { projectionFn, memoize } = createDefaultMemoize();

      const fixResult = { a: 4711 };
      memoize.setResult(fixResult);
      memoize.clearResult();
      const result = memoize.memoized(1);

      expect(projectionFn).toHaveBeenCalledTimes(1);
      expect(result).toBe(projectionFn.mock.results[0].value);
    });
  });

  describe('reset', () => {
    it('should clear lastArguments', () => {
      const { projectionFn, memoize } = createDefaultMemoize();

      const result1 = memoize.memoized(1);
      memoize.reset();
      const result2 = memoize.memoized(1);

      expect(projectionFn).toHaveBeenCalledTimes(2);
      expect(result1).toBe(projectionFn.mock.results[0].value);
      expect(result2).toBe(projectionFn.mock.results[1].value);
    });

    it('should clear lastResult', () => {
      const { projectionFn, memoize } = createDefaultMemoize({ resultEqual: () => true });

      const result1 = memoize.memoized(1);
      memoize.reset();
      const result2 = memoize.memoized(2);

      expect(projectionFn).toHaveBeenCalledTimes(2);
      expect(result1).toBe(projectionFn.mock.results[0].value);
      expect(result2).toBe(projectionFn.mock.results[1].value);
    });
  });
});
