export default {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!(three)/)"  // Permitir que Jest transforme "three"
  ]
}
