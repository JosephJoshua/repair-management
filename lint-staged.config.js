/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// https://nextjs.org/docs/basic-features/eslint#lint-staged
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const prettier = 'yarn run prettier --write';

module.exports = {
  '**/*.{js,jsx,ts,tsx}': [prettier, buildEslintCommand],
  '**/*.{json,md,yml,yaml}': [prettier],
};
