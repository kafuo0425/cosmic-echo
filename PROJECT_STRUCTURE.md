✨ 宇宙回声 Cosmic Echo - 项目结构说明 ✨

📌 **深入了解项目目录结构，帮助开发者快速上手并扩展 Cosmic Echo 聊天机器人。**

📁 **目录概览**
宇宙回声 Cosmic Echo 项目采用模块化设计，以下是项目的主要文件夹及其职责的简要说明，帮助开发者快速理解项目架构：

```
cosmic-echo/
├── config/                # 项目配置文件
├── controllers/           # 处理业务逻辑和请求的控制器
├── locales/               # 多语言支持的翻译文件
├── models/                # 数据模型（与 MongoDB 集成）
├── routes/                # 定义各 API 端点的路由
├── services/              # 业务逻辑处理
├── utils/                 # 工具函数和日志
├── app.js                 # 应用的主入口文件
└── package.json           # 项目的依赖和脚本管理文件
```

📜 **详细目录说明**

### 1. 🌐 config/ - 配置文件夹
存储项目的环境配置，确保应用在不同环境（开发、测试、生产）中顺利运行。只需修改配置文件即可适应不同环境，无需更改代码。

**主要文件：**
- `default.json`：默认配置。
- `development.json`：开发环境配置。
- `production.json`：生产环境配置。

### 2. 🛠️ controllers/ - 控制器
处理 HTTP 请求，操作数据并调用服务层逻辑。每个控制器对应特定功能模块，如聊天、用户管理等。

**主要文件：**
- `chatbotController.js`：处理聊天请求。
- `facebookController.js`：处理 Facebook Webhook 事件。
- `userController.js`：管理用户相关操作。

### 3. 🌍 locales/ - 多语言支持
通过 i18next 实现国际化，每种语言有对应的 JSON 文件，存储翻译文本。

**主要文件：**
- `en.json`：英文翻译。
- `zh.json`：中文翻译。

### 4. 🗂️ models/ - 数据模型
与 MongoDB 数据库交互，定义数据结构和验证规则。

**主要文件：**
- `userModel.js`：定义用户数据结构。
- `userPreferencesModel.js`：存储用户个性化设置。

### 5. 🌐 routes/ - 路由
定义所有 API 端点，将请求分发给相应控制器。

**主要文件：**
- `api.js`：定义所有 API 的主路由。
- `facebookWebhook.js`：处理 Facebook Webhook 请求。

### 6. 🔧 services/ - 服务层
包含主要业务逻辑，处理复杂数据操作及与外部 API 的交互。将业务逻辑与控制器分离，便于维护和扩展。

**主要文件：**
- `emotionService.js`：用户情感分析。
- `intentService.js`：识别用户需求。
- `messageService.js`：管理聊天消息的生成和回复。

### 7. 🛠️ utils/ - 工具类
包含工具和辅助函数，提高代码复用性。

**主要文件：**
- `helper.js`：常用辅助函数。
- `logger.js`：记录日志，方便调试和监控。

### 8. 🚀 app.js - 应用入口
项目的核心文件，初始化 Express 应用程序，加载中间件、路由和数据库配置，启动服务器。

🛡️ **功能概述：**
- 加载中间件（如 helmet、body-parser、cors）。
- 连接 MongoDB 数据库。
- 注册路由，启动服务器。

### 9. 📦 package.json - 依赖和脚本管理
定义项目依赖、脚本及 Node.js 版本要求，帮助项目自动安装所需库。

**主要字段：**
- `dependencies`：核心依赖，如 express、mongoose。
- `devDependencies`：开发时的依赖，如 nodemon、jest。
- `scripts`：常用的 NPM 脚本命令，如启动项目（`npm start`）。

🌟 **总结**
希望这份项目结构说明帮助开发者快速了解 Cosmic Echo 的架构，提升开发效率。如有任何问题，欢迎联系项目维护者！
