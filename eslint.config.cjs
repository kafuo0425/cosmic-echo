/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    node: true, // Node.js 环境
    jest: true, // Jest 测试环境
  },
  extends: [
    'eslint:recommended', // 使用推荐的 ESLint 规则
    'plugin:node/recommended', // 使用 Node.js 插件的推荐规则
    'plugin:import/errors', // 添加 import 错误处理
    'plugin:import/warnings', // 添加 import 警告
    'plugin:prettier/recommended', // 集成 Prettier
    'plugin:security/recommended', // 添加安全插件的推荐规则
  ],
  parserOptions: {
    ecmaVersion: 2021, // 使用 ECMAScript 2021
    sourceType: 'commonjs', // CommonJS 模块
  },
  globals: {
    require: 'readonly',
    process: 'readonly',
    module: 'readonly',
    __dirname: 'readonly',
    jest: 'readonly',
  },
  plugins: [
    'prettier', // Prettier 插件
    'node', // Node.js 插件
    'security', // 安全插件
    'import', // import 插件
  ],
  rules: {
    'prettier/prettier': ['error'], // 确保代码符合 Prettier 规则
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 忽略以下划线开头的参数
    'no-console': 'warn', // 在代码中使用 console 时发出警告
    'security/detect-object-injection': 'error', // 检测对象注入
    'security/detect-non-literal-fs-filename': 'error', // 检测文件系统操作中的非字面量文件名
    'security/detect-non-literal-require': 'error', // 检测 require 中的非字面量路径
    eqeqeq: ['error', 'always'], // 强制使用全等
    curly: ['error', 'all'], // 强制在所有控制语句中使用大括号
    'no-var': 'error', // 禁止使用 var
    'prefer-const': 'error', // 强制使用 const
    'consistent-return': 'error', // 强制每个函数都有一致的返回
    'no-magic-numbers': ['warn', { ignore: [0, 1] }], // 防止魔法数字的使用
    complexity: ['warn', { max: 10 }], // 限制函数复杂度
    'node/no-unsupported-features/es-syntax': 'error', // 禁用不支持的 ES 特性
    indent: ['error', 2], // 统一缩进为 2 个空格
    quotes: ['error', 'single'], // 统一使用单引号
    semi: ['error', 'always'], // 统一使用分号
    'no-duplicate-imports': 'error', // 禁止重复导入
    'prefer-template': 'error', // 强制使用模板字符串而不是字符串连接
    'object-shorthand': ['error', 'always'], // 强制使用对象简写
  },
  overrides: [
    {
      files: ['*.test.js'], // 针对测试文件的特殊规则
      rules: {
        'no-console': 'off', // 测试文件允许使用 console
        'jest/no-disabled-tests': 'warn', // 警告禁用的测试
        'jest/no-focused-tests': 'error', // 禁止集中测试
        'jest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }], // 测试一致性
      },
    },
    {
      files: ['*.js'], // 适用于所有 JavaScript 文件
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // 允许在开发依赖中使用 import
      },
    },
  ],
};