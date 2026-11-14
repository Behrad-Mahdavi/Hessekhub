module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*\\.(spec|test)\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.(t|j)s"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@hessekhub/shared-types$": "<rootDir>/../../packages/shared-types/src/index.ts",
    "^@hessekhub/design-tokens$": "<rootDir>/../../packages/design-tokens/index.ts",
    "^@hessekhub/database$": "<rootDir>/../../packages/database/src/index.ts",
  },
};

