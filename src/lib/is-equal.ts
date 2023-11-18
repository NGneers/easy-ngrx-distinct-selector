export type EqualsFn<T> = (a: T, b: T) => boolean;

export const defaultEqualsFn: EqualsFn<any> = (a, b) => a === b;

export const defaultArrayEqualsFn: EqualsFn<any[]> = (a, b) =>
  a.length === b.length && a.every((x, i) => x === b[i]);
