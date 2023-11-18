const esModules = ['@angular', '@ngrx'];

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  roots: ['./src/lib'],
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      // ts-jest configuration goes here and your IDE will suggest which configs when typing
      tsconfig: './tsconfig.test.json',
      useESM: true
    }
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  reporters: ['default', ['jest-junit', { outputName: 'junit.xml' }]],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!.*\\.mjs$|${esModules.join('|')})`,
  ]
};
