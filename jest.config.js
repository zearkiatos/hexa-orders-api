/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest");
const TSConfig = require("./tsconfig.spec.json");

module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.spec.json",
    },
  },
  verbose: true,
  preset: "ts-jest",
  roots: ["src", "tests"],
  testEnvironment: "node",
  testRegex: "((\\.|/*.)(test))\\.ts?$",
  setupFiles: ["./tests/jest.setup.ts"],
  collectCoverageFrom: ["src/**/*"],
  coverageThreshold: {
    global: {
      statements: 72,
      branches: 65,
      lines: 72,
      functions: 81,
    },
  },
  moduleDirectories: ["node_modules", "src", "tests"],
  moduleNameMapper: pathsToModuleNameMapper(TSConfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};