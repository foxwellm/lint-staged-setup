import path from "path";

const buildEslintCommand = (filenames) => {
  const files = filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ");
  return [
    `next lint --fix --file ${files}`,
    `prettier --write ${filenames.join(" ")}`,
  ];
};

const lintStagedConfig = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*.{json,md,css,scss,html}": ["prettier --write"],
};

export default lintStagedConfig;
