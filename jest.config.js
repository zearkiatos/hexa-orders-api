const { pathsToModuleNameMapper } = require("ts-jest/utils");
const TSConfig = require("./tsconfig.spec.json");

module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.spec.json",
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
      statements: 50,
      branches: 50,
      lines: 50,
      functions: 50,
    },
  },
  moduleDirectories: ["node_modules", "src", "tests"],
  moduleNameMapper: pathsToModuleNameMapper(TSConfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};
