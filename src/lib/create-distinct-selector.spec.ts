import { createDistinctSelector } from './create-distinct-selector';
import { produce } from 'immer';
import { defaultArrayEqualsFn } from './is-equal';

type AppState = {
  movie: {
    count: number;
    names: string[];
    filter: string;
  };
  series: {
    count: number;
    names: string[];
    filter: string;
  };
};
function getAppState() {
  return {
    movie: {
      count: 5,
      names: [
        'The incredible Hulk',
        'Iron Man',
        'Iron Man 2',
        'Thor',
        'Captain America: The First Avenger',
      ],
      filter: '',
    },
    series: {
      count: 3,
      names: ['Agents of S.H.I.E.L.D.', 'Agent Carter', 'Inhumans'],
      filter: '',
    }
  };
}

describe('createDistinctSelector', () => {
  it('should project the state', () => {
    const appState = getAppState();
    const selector = createDistinctSelector(
      (state: AppState) => state.movie.count,
    );

    expect(selector(appState)).toBe(5);
  });

  it('should project the state with one argument', () => {
    const appState = getAppState();
    const selector = createDistinctSelector(
      (state: AppState) => state.movie.names,
      (names) => names.length,
    );

    expect(selector(appState)).toBe(5);
  });

  it('should project the state with multiple arguments', () => {
    const appState = getAppState();
    appState.movie.filter = 'Iron';
    appState.series.filter = 'Agent';
    const selector = createDistinctSelector(
      (state: AppState) => state.movie.names,
      (state: AppState) => state.movie.filter,
      (state: AppState) => state.series.names,
      (state: AppState) => state.series.filter,
      (movieNames, movieFilter, seriesNames, seriesFilter) => {
        const filteredMovieNames = movieNames.filter(name => name.includes(movieFilter));
        const filteredSeriesNames = seriesNames.filter(name => name.includes(seriesFilter));
        return filteredMovieNames.length + filteredSeriesNames.length;
      },
    );

    expect(selector(appState)).toBe(4);
  });

  it('should not call the projector if the arguments are equal', () => {
    const appState = getAppState();
    const projectionFn = jest.fn((names: string[]) => names.length);
    const selector = createDistinctSelector(
      (state: AppState) => state.movie.names,
      projectionFn,
    );

    selector(appState);
    selector(appState);

    expect(projectionFn).toHaveBeenCalledTimes(1);
  });

  it('should not call the projector if the argsEqual function returns true', () => {
    const appState = getAppState();
    const projectionFn = jest.fn((names: string[]) => names.length);
    const selector = createDistinctSelector(
      (state: AppState) => state.movie.names,
      projectionFn,
      { argsEqual: () => true },
    );

    expect(selector(appState)).toBe(5);
    expect(selector(produce(appState, draft => { draft.movie.names = []; }))).toBe(5);
    expect(projectionFn).toHaveBeenCalledTimes(1);
  });

  it('should reuse the memoized result if the resultEqual function returns true', () => {
    const appState1 = getAppState();
    const appState2 = produce(appState1, draft => { draft.movie.names = [...draft.movie.names]; });
    const projectionFn = jest.fn((movie: AppState['movie']) => movie.names);
    const selector = createDistinctSelector(
      (state: AppState) => state.movie,
      projectionFn,
      { resultEqual: defaultArrayEqualsFn },
    );

    expect(selector(appState1)).toBe(appState1.movie.names);
    expect(selector(appState2)).toBe(appState1.movie.names);
    expect(projectionFn).toHaveBeenCalledTimes(2);
  });
});
