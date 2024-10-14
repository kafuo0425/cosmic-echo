#!/bin/bash

echo "开始项目依赖优化与更新..."

# 1. 移除不再维护的 inflight 包
echo "移除 inflight 包..."
npm uninstall inflight

# 2. 安装 p-limit 替代 inflight 包
echo "安装 p-limit 作为替代..."
npm install p-limit --save

# 3. 升级 ws 到最新安全版本 8.17.1 以上
echo "升级 ws 包到 8.17.1 以上..."
npm install ws@^8.17.1 --save

# 4. 安装安全性检查和代码质量工具
echo "安装 husky, lint-staged, eslint..."
npm install eslint husky lint-staged --save-dev

# 5. 初始化 husky
echo "初始化 husky..."
npx husky install

# 6. 添加 Lint 规则
echo "配置 eslint..."
npx eslint --init

# 7. 更新 package.json 文件（手动修改部分）
echo "更新 package.json 文件..."
cat <<EOT > package.json
{
  "name": "宇宙回声 Cosmic Echo",
  "version": "1.1.0",
  "description": "A calm and intuitive chatbot that supports the spiritual and emotional guidance work of High-Dimensional Space.",
  "main": "app.js",
  "scripts": {
    "start": "NODE_ENV=production node app.js",
    "start:dev": "NODE_ENV=development nodemon app.js",
    "test": "jest --coverage",
    "clean": "rimraf dist",
    "build": "npm run clean && npm run compile",
    "compile": "babel src --out-dir dist",
    "check:security": "npm audit",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --fix"
  },
  "dependencies": {
    "axios": "1.7.7",
    "compression": "1.7.4",
    "connect-timeout": "^1.9.0",
    "cors": "2.8.5",
    "dotenv": "16.4.5",
    "express": "4.21.1",
    "express-validator": "7.2.0",
    "helmet": "8.0.0",
    "i18next": "23.16.0",
    "mongoose": "8.7.1",
    "p-limit": "^4.0.0",  
    "winston": "3.15.0",
    "ws": "^8.17.1"  
  },
  "devDependencies": {
    "eslint": "9.12.0",
    "jest": "29.7.0",
    "nodemon": "3.1.7",
    "rimraf": "5.0.0",
    "supertest": "7.0.0",
    "husky": "^8.0.0",
    "lint-staged": "^13.0.0"
  },
  "engines": {
    "node": ">=14 <19"
  }
}
EOT

# 8. 添加 husky 钩子和 lint-staged 配置
echo "配置 husky 钩子和 lint-staged..."
npx husky add .husky/pre-commit "npx lint-staged"

echo "优化完成！请确保检查更新的 package.json，并手动调整项目中 inflight 的调用代码。"
