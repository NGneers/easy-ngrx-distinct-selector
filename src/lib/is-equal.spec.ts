import { defaultArrayEqualsFn, defaultEqualsFn } from './is-equal';

describe('defaultEqualsFn', () => {
  it('should return true if both arguments are the same', () => {
    expect(defaultEqualsFn(1, 1)).toBe(true);
  });

  it('should return false if both arguments are not the same', () => {
    expect(defaultEqualsFn(1, 2)).toBe(false);
  });
});

describe('defaultArrayEqualsFn', () => {
  it('should return true if both arguments are the same', () => {
    expect(defaultArrayEqualsFn([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it('should return false if both arguments are not the same', () => {
    expect(defaultArrayEqualsFn([1, 2, 3], [1, 2, 4])).toBe(false);
  });

  it('should return false if both arguments have different lengths', () => {
    expect(defaultArrayEqualsFn([1, 2, 3], [1, 2])).toBe(false);
  });
});
