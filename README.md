1. Install Husky

https://typicode.github.io/husky/get-started.html

.husky/pre-commit -> npm run lint -- --fix

2. Add lint-staged and prettier

npm i -D lint-staged prettier

.husky/pre-commit -> npx lint-staged

https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files
Add .lintstagedrc.mjs

Add tsc --noEmit" to .lintstagedrc.mjs, it runs TypeScript checks on the files without emmiting its JavaScript file.

next/typescript based on plugin:@typescript-eslint/recommended (@typescript-eslint/eslint-plugin)

So, plugin:@typescript-eslint/recommended-requiring-type-checking would need parser: '@typescript-eslint/parser' set in config. Otherwise next/typescipt handles basic linting

Customizing languageOptions in config also requires own parser (@typescript-eslint/parser)

next/core-web-vitals updates eslint-plugin-next

In ESLint, extends is shorthand for importing and merging predefined configurations — which may include: rules, parser, parserOptions, plugins, etc
So, the order matters. The top configs will be overriden by lower ones if they conflict.

recommended-requiring-type-checking rules overwrite next/core-web-vitals

```
export default [
  ...compat.config({
    extends: ['next/core-web-vitals'],
  }),
  {
    rules: {
      ...tsPlugin.configs['recommended-requiring-type-checking'].rules,
    },
  },
];
```

next/core-web-vitals rules overwrite recommended-requiring-type-checking

```
export default [
  {
    rules: {
      ...tsPlugin.configs['recommended-requiring-type-checking'].rules,
    },
  },
  ...compat.config({
    extends: ['next/core-web-vitals'],
  }),
];
```

3. Add .prettierrc (custom config) and npm i -D eslint-config-prettier

Add 'prettier' to end of extends (eslint-config-prettier only turns OFF eslint rules that would conflict with prettier)

4. Add https://typescript-eslint.io/users/configs/#recommended-type-checked to rules.
   Now eslint needs a reference to how to configure TS, so add languageOptions.parserOptions.project: ['./tsconfig.json']

5. Add eslint-plugin-simple-import-sort

ADDITIONAL NOTES:

Weird errors and bugs like "parser" key not correctly nested (when it is) and npx lint-staged not using updated eslint.config.mjs file was fixed by rebuilding eslint.config.mjs from beginning
