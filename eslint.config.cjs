module.exports = [
  {
    // 全局忽略模式
    ignores: [
      'coverage/',
      'coverage/lcov-report/',
      'dist/',
      'build/',
      'public/',
      '.env',
      'webhook-server/.env',
      'node_modules/',
      'webhook-server/node_modules/',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '*.tmp',
      '*.temp',
      'tmp/',
      'temp/',
      '.DS_Store',
      'Thumbs.db',
      'ehthumbs.db',
      'Desktop.ini',
      '*nfs*',
      '.vscode/',
      '.idea/',
      '*.suo',
      '*.ntvs*',
      '*.njsproj',
      '*.sln',
      '.eslintcache',
      '*.tsbuildinfo',
    ],
  },
  {
    // 针对 JavaScript 和 JSX 文件
    files: ['*.js', '*.jsx'],
    languageOptions: {
      ecmaVersion: 2021, // 使用 ECMAScript 2021 版本
      sourceType: 'script', // 使用 CommonJS 模块系统
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
      sourceType: 'module',  // TypeScript 文件可以继续使用 ES 模块
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
