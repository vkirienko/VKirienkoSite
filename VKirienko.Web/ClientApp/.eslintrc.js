module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "globals": {},
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2016,
    "project": "tsconfig.json",
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true
    }
  },
  "settings": {},
  "rules": {
  }
};