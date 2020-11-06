process.env.TZ = "America/Chicago";

module.exports = {
  clearMocks: true,
  resetMocks: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,jsx}",
    "!**/*.int.{spec,test}.{js,jsx}",
  ],
  coverageReporters: ["json"],
  moduleDirectories: ["node_modules", "<rootDir>/src/js", "<rootDir>"],
  moduleFileExtensions: ["js", "jsx", "json"],
  rootDir: "../",
  setupFilesAfterEnv: ["jest-extended", "jest-chain"],
  testPathIgnorePatterns: ["cypress/*", "/src/.+int.(spec|test).js(x)?"],
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
  },
};
