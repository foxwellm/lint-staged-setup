import path from "path";

const buildEslintCommand = (filenames) => {
  const files = filenames.map((f) => path.relative(process.cwd(), f)).join(" ");
  return [
    "tsc --noEmit",
    `eslint --fix ${files}`,
    `prettier --write ${files}`,
  ];
};

const lintStagedConfig = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*.{json,md,css,scss,html}": ["prettier --write"],
};

export default lintStagedConfig;
