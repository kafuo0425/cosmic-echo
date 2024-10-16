# 🗂️ 宇宙回声 Cosmic Echo 项目结构说明

**宇宙回声 Cosmic Echo** 是一个基于 **Node.js** 和 **Express** 的 Web 应用，采用 MVC 架构，旨在提供多平台的自动化客户服务解决方案。项目结构模块化、清晰，便于维护与扩展。

## 🏗️ 目录结构概览

```
C:.
|   app.js                   # 应用入口文件
|   package.json             # 项目依赖和脚本定义
|   .env                     # 环境变量配置文件
|   README.md                # 项目说明文件
|
+---config                   # 配置文件目录
+---middlewares              # 中间件
+---routes                   # 路由定义
+---controllers              # 控制器：处理业务逻辑
+---services                 # 服务层：业务逻辑实现
+---models                   # 数据模型：与数据库的映射
+---utils                    # 工具函数
+---locales                  # 多语言支持文件
+---logs                     # 日志文件
+---coverage                 # 测试覆盖率报告
+---.github                  # GitHub Actions 配置
+---.husky                   # Git 钩子配置
```

## 📂 详细说明

### 1. `app.js` - 应用入口文件
- **功能**：核心启动文件，负责加载环境变量、初始化中间件、设置路由并启动服务器。
- **职责**：
  - 初始化项目配置
  - 注册全局中间件（如日志、错误处理）
  - 启动应用并监听端口

### 2. `package.json` - 项目依赖和脚本定义
- **功能**：存储项目元数据，包括名称、版本、依赖项及脚本命令。
- **关键字段**：
  - **dependencies**：运行时核心依赖
  - **devDependencies**：开发阶段所需依赖
  - **scripts**：可执行的 npm 命令，如 `npm start`、`npm test`

### 3. `config/` - 配置文件目录
- **功能**：存放应用不同环境下的配置文件（如开发和生产环境）。
- **主要文件**：
  - `default.json`：默认配置
  - `development.json`：开发环境配置
  - `production.json`：生产环境配置
  - `services.json`：外部服务配置，例如 API 接口

### 4. `middlewares/` - 中间件目录
- **功能**：存放 Express 应用中间件，用于处理请求的通用逻辑。
- **示例中间件**：
  - `verifyWebhook.js`：验证 Webhook 请求的合法性

### 5. `routes/` - 路由定义
- **功能**：定义应用路由，将请求转发至对应控制器。
- **主要路由文件**：
  - `api.js`：API 路由入口
  - `appointmentRoutes.js`：处理预约相关请求
  - `facebookWebhook.js`：处理 Facebook Webhook 消息
  - `whatsappWebhook.js`：处理 WhatsApp Webhook 消息

### 6. `controllers/` - 控制器层
- **功能**：处理 HTTP 请求并调用服务层完成业务逻辑。
- **主要控制器**：
  - `appointmentController.js`：处理预约请求
  - `chatbotController.js`：处理聊天机器人请求
  - `facebookController.js`：处理 Facebook 相关逻辑
  - `whatsappController.js`：处理 WhatsApp 相关逻辑

### 7. `services/` - 服务层
- **功能**：包含应用的核心业务逻辑，控制器调用服务来处理具体业务操作。
- **主要服务**：
  - `appointmentService.js`：预约业务逻辑
  - `emotionService.js`：情感分析服务
  - `messageService.js`：处理消息的收发与格式化

### 8. `models/` - 数据模型层
- **功能**：使用 **Mongoose** 定义与数据库交互的模型。
- **主要模型**：
  - `userModel.js`：用户数据模型
  - `userPreferencesModel.js`：用户偏好数据模型

### 9. `utils/` - 工具函数目录
- **功能**：包含常用工具函数，供全局使用，减少代码重复。
- **主要工具**：
  - `errorHandler.js`：错误处理函数
  - `logger.js`：基于 **Winston** 的日志记录工具

### 10. `locales/` - 多语言支持
- **功能**：存储翻译文件，支持多语言应用。
- **主要文件**：
  - `en.json`：英文翻译
  - `zh.json`：中文翻译

### 11. `logs/` - 日志文件
- **功能**：存储运行日志，便于调试和记录事件。
- **主要文件**：
  - `app.log`：记录应用日志

### 12. `coverage/` - 测试覆盖率报告
- **功能**：存储测试覆盖率报告，帮助评估测试的完整性。
- **主要文件**：
  - `index.html`：测试覆盖率详情

### 13. `.github/` - GitHub Actions 配置
- **功能**：存储 GitHub Actions 工作流配置，用于 CI/CD 自动化任务。
- **主要文件**：
  - `ci.yml`：持续集成配置

### 14. `.husky/` - Git 钩子配置
- **功能**：在特定的 Git 操作（如提交、推送）前执行任务。
- **主要文件**：
  - `pre-commit`：提交前运行代码检查
  - `pre-push`：推送前运行测试

---

## 🎯 项目结构设计原则
- **模块化**：功能模块独立，便于维护与扩展。
- **可扩展性**：控制器与服务分离，利于添加新功能。
- **高安全性**：通过中间件和配置管理，确保应用安全性与稳定性。

通过这种结构设计，开发者能快速理解项目核心功能，便于高效开发与维护。🚀