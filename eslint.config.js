import securityPlugin from "eslint-plugin-security";
import importPlugin from "eslint-plugin-import";
import babelParser from "@babel/eslint-parser";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["*.js", "*.mjs", "*.cjs"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-env"],
        },
      },
      globals: {
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        process: "readonly",
        __dirname: "readonly",
        setTimeout: "readonly",
      },
    },
    plugins: {
      security: securityPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "quotes": ["error", "single"],
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-eval-with-expression": "error",
      "security/detect-new-buffer": "warn",
      "no-undef": "error",
      "no-duplicate-imports": "error",
      "import/no-duplicates": "error",
      "prettier/prettier": "error", // 添加 Prettier 规则
    },
  },
];