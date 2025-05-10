1. Install Husky

https://typicode.github.io/husky/get-started.html

.husky/pre-commit -> npm run lint -- --fix

2. Add lint-staged and prettier

npm i -D lint-staged prettier

.husky/pre-commit -> npx lint-staged

https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files
Add .lintstagedrc.mjs
