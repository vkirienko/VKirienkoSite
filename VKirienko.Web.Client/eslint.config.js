const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const url = require('url');

module.exports = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: url.pathToFileURL(__filename).toString()
      }
    },
    rules: {
      "@typescript-eslint/no-this-alias": [
        "error",
        {
          allowedNames: ["self"], // Allow `const self = this`; `[]` by default
        },
      ]
    }
  }
];
