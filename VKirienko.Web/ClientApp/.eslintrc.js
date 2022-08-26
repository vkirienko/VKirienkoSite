module.exports = {
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  },
  "extends": [
    "plugin:@angular-eslint/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "settings": {},
  "rules": {
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowedNames: ['self'], // Allow `const self = this`; `[]` by default
      },
    ]
  }
};