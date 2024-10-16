// eslint.config.js

module.exports = [
  {
    // 针对 JavaScript 和 JSX 文件
    files: ['*.js', '*.jsx'],
    languageOptions: {
      ecmaVersion: 2021, // 使用 ECMAScript 2021 版本
      sourceType: 'module', // 启用 ECMAScript 模块
      globals: {  // 全局变量
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      react: { // React 插件
        settings: {
          version: 'detect',  // 自动检测 React 版本
        },
      },
    },
    rules: {
      'no-unused-vars': 'warn',  // 警告未使用的变量
      'react/prop-types': 'off', // 关闭 prop-types 检查
    },
  },
  {
    // 针对 TypeScript 文件的配置
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',  // 使用 TypeScript 解析器
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': {},  // 启用 TypeScript 插件
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],  // 警告未使用的变量
      '@typescript-eslint/no-explicit-any': 'off',  // 允许使用 `any` 类型
      '@typescript-eslint/explicit-function-return-type': 'off',  // 不强制要求函数返回类型
    },
  },
];