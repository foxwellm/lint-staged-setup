import path from "path";

const buildEslintCommand = (filenames) => {
  const files = filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ");
  return [
    "tsc --noEmit",
    // --config shouldn't be necessary, but doesn't hurt
    `next lint --config ./eslint.config.mjs --fix --file ${files}`,
    `prettier --write ${filenames.join(" ")}`,
  ];
};

const lintStagedConfig = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*.{json,md,css,scss,html}": ["prettier --write"],
};

export default lintStagedConfig;
