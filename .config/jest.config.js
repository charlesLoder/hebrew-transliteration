module.exports = {
  transform: { "^.+\\.ts?$": "ts-jest" },
  testEnvironment: "node",
  testRegex: "/test/.*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  rootDir: "../",
  moduleNameMapper: {
    "havarotjs/dist/utils/regularExpressions": "<rootDir>/node_modules/havarotjs/dist/utils/regularExpressions"
  }
};
