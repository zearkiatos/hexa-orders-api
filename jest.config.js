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
  name: "hexa-shopping-cart-orders-api",
  verbose: true,
  preset: "ts-jest",
  roots: ["src/", "tests/"],
  testEnvironment: "node",
  setupFiles: ["./tests/jest.setup.ts"],
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  coverageThreshold: {
    global: {
      statements: 69,
      branches: 56,
      lines: 69,
      functions: 78,
    },
  },
  moduleDirectories: ["node_modules", "src", "tests"],
  moduleNameMapper: pathsToModuleNameMapper(TSConfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};
