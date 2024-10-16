# 🌌 宇宙回声 Cosmic Echo

**宇宙回声 Cosmic Echo** 是 **高维空间 High-Dimensional Space** 工作室开发的基于 **Node.js** 和 **Express** 的 Web 应用，旨在通过智能聊天机器人为客户提供即时的情感和心灵指导支持。此项目集成了多个第三方服务，如 **Facebook** 和 **WhatsApp Webhook**，并支持多语言和安全机制。

## 📋 目录
- [功能概述](#功能概述)
- [技术栈](#技术栈)
- [安装与运行](#安装与运行)
- [脚本命令](#脚本命令)
- [依赖项](#依赖项)
- [开发与测试](#开发与测试)
- [项目结构](#项目结构)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## 🌟 功能概述
- **多平台消息集成**：支持 **Facebook** 和 **WhatsApp Webhook**，自动处理消息与交互。
- **多语言支持**：通过 **i18next** 实现，满足不同客户的需求。
- **情感分析**：提供客户情感分析，为用户提供个性化建议。
- **用户预约管理**：自动化处理预约。
- **高效安全**：通过 **Helmet**、**CSRF**、**express-rate-limit** 提供安全保护。
- **日志记录**：集成 **Winston**，支持灵活日志管理。

## 🛠️ 技术栈
- **Node.js**：JavaScript 运行时环境
- **Express.js**：Web 框架
- **Mongoose**：与 MongoDB 交互的 ORM
- **i18next**：多语言支持库
- **Winston**：日志管理工具
- **Jest**：单元测试框架
- **Husky**：Git 钩子管理工具

## 🚀 安装与运行
### 环境要求
- **Node.js**：版本 >= 18 且 < 25
- **npm**：版本 >= 6
- **MongoDB** 数据库

### 安装步骤
1. **克隆项目**：
   ```bash
   git clone https://github.com/yourusername/cosmic-echo.git
   cd cosmic-echo
   ```
2. **安装依赖**：
   ```bash
   npm install
   ```
3. **配置环境变量**：复制 `.env.example` 为 `.env`，并填入必要变量。
4. **启动应用**：
   - 开发模式：
     ```bash
     npm run start:dev
     ```
   - 生产模式：
     ```bash
     npm start
     ```
5. **访问应用**：打开 `http://localhost:9587`

## 📜 脚本命令
- **启动**：`npm start`（生产）、`npm run start:dev`（开发）
- **代码检查**：`npm run lint`，自动修复：`npm run lint:fix`
- **测试**：`npm test` 运行单元测试
- **安全检查**：`npm run check:security`
- **Git 钩子**：`precommit` 运行代码检查，`prepush` 运行测试

## 📦 依赖项
### 核心依赖
- **express**：Web 框架
- **mongoose**：MongoDB 交互
- **axios**：HTTP 请求工具
- **helmet**：增强安全性
- **i18next**：多语言支持
- **winston**：日志管理

### 开发依赖
- **jest**：测试框架
- **eslint**：代码规范检查
- **husky**：Git 钩子管理
- **nodemon**：开发模式自动重载
- **supertest**：HTTP 接口测试

## 🔧 开发与测试
1. **运行测试**：
   ```bash
   npm test
   ```
2. **代码检查**：
   ```bash
   npm run lint
   ```
3. **自动修复**：
   ```bash
   npm run lint:fix
   ```
4. **安全检查**：
   ```bash
   npm run check:security
   ```

## 📂 项目结构
```
C:.
|   app.js                   # 应用入口
|   package.json             # 项目依赖和脚本定义
|   .env                     # 环境变量配置
|   README.md                # 项目说明
|
+---config                   # 配置文件
+---middlewares              # 中间件
+---routes                   # 路由
+---controllers              # 控制器
+---services                 # 业务逻辑
+---models                   # 数据模型
+---utils                    # 工具函数
+---locales                  # 多语言支持
+---logs                     # 日志文件
+---coverage                 # 测试覆盖率报告
```
### 主要文件和目录
- **`app.js`**：应用入口，初始化服务器和路由
- **`config/`**：环境配置文件
- **`middlewares/`**：处理请求前的逻辑
- **`routes/`**：路由定义
- **`controllers/`**：处理 HTTP 请求
- **`services/`**：业务逻辑实现
- **`models/`**：数据模型定义
- **`locales/`**：多语言支持
- **`logs/`**：日志管理

## 🤝 贡献指南
欢迎贡献！步骤如下：
1. **Fork 项目**：在 GitHub 上 fork 并克隆到本地。
   ```bash
   git clone https://github.com/yourusername/cosmic-echo.git
   ```
2. **创建分支**：
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **提交代码**：
   ```bash
   git commit -m "Add new feature"
   ```
4. **推送分支**：
   ```bash
   git push origin feature/your-feature-name
   ```
5. **提交 Pull Request**：在 GitHub 上提交 PR。

## 📜 许可证
该项目采用 [MIT 许可证](./LICENSE)，欢迎自由使用与贡献。