# 📂 项目结构 - Cosmic Echo

本文件将详细描述 **Cosmic Echo** 项目的文件和目录结构，帮助开发者更清晰地了解项目各个部分的用途和功能。

---

## 🗂️ 顶级目录结构

```
cosmic-echo/
├── config/          # 项目配置文件
├── controllers/     # 业务逻辑处理
├── locales/         # 多语言支持
├── logs/            # 日志文件目录
├── middlewares/     # 中间件功能
├── models/          # 数据模型定义
├── routes/          # API 路由定义
├── services/        # 业务服务层
├── utils/           # 工具模块（如日志和错误处理）
├── .env             # 环境变量配置文件
├── .gitignore       # Git 忽略文件配置
├── app.js           # 应用程序入口
├── eslint.config.js # ESLint 配置文件
├── package.json     # 项目依赖和脚本
├── Procfile         # Heroku 部署配置
├── README.md        # 项目简介与使用说明
└── setup.js         # 项目初始化脚本
```

---

## 目录详细说明

### 1. **config/**

该目录包含项目的配置文件，按不同的运行环境（如开发、生产）进行区分。你可以在这里为项目配置不同的数据库连接、服务 URL 等。

- `config/default.json`：默认配置文件。
- `config/development.json`：开发环境配置。
- `config/production.json`：生产环境配置。
- `config/courses.json`：课程数据配置。
- `config/services.json`：服务相关的配置项。

### 2. **controllers/**

此目录包含应用程序的核心控制器，每个控制器文件处理特定的业务逻辑和用户请求。每个控制器通常与特定的路由和模型关联。

- `appointmentController.js`：处理预约相关的业务逻辑。
- `chatbotController.js`：处理聊天机器人交互逻辑。
- `userController.js`：用户管理相关的逻辑。
- 其他控制器文件均负责与各自模块（如课程、服务、个性化）相关的业务处理。

### 3. **locales/**

项目的多语言支持目录，包含各个语言的翻译文件。项目通过这些文件支持多种语言，确保用户能够根据语言偏好获取服务。

- `en.json`：英语翻译文件。
- `ms.json`：马来语翻译文件。
- `zh.json`：中文翻译文件。

### 4. **logs/**

该目录用于存储项目运行时生成的日志文件。项目使用 **Winston** 进行日志记录，日志文件会根据日期自动轮转。

- 日志文件如：`app-2024-10-25.log` 会以日期命名存储，便于追踪项目运行情况。

### 5. **middlewares/**

存放项目的中间件逻辑，主要用于处理 HTTP 请求之前的预处理任务，例如验证和解析。

- `verifyWebhook.js`：用于验证 Webhook 请求的有效性。

### 6. **models/**

此目录包含所有 MongoDB 数据模型的定义，使用 **Mongoose** 进行 ODM 操作，管理数据的存储和查询。

- `userModel.js`：定义用户数据结构。
- `userPreferencesModel.js`：定义用户偏好相关的数据结构。
- `index.js`：集中导出所有模型。

### 7. **routes/**

该目录存储 API 路由定义，负责将用户请求分发到相应的控制器。

- `api.js`：定义了所有 API 路由的主文件。
- `appointmentRoutes.js`：处理预约相关的 API 路由。
- `facebookWebhook.js`：处理 Facebook Webhook 路由。
- 其他路由文件与相应的服务功能模块相关。

### 8. **services/**

此目录中的文件主要负责业务逻辑的实现，服务层通常会调用外部 API 或与数据库交互，提供数据处理与业务操作。

- `appointmentService.js`：管理预约功能相关的业务逻辑。
- `languageService.js`：多语言处理逻辑。
- `webhookService.js`：处理 Webhook 请求的业务逻辑。

### 9. **utils/**

此目录包含一些实用工具模块，供整个项目使用，如日志、错误处理、通用函数等。

- `logger.js`：基于 **Winston** 的日志系统配置，处理项目的日志记录。
- `errorHandler.js`：全局错误处理模块，统一捕获并处理应用中的错误。
- `helper.js`：存放常用的通用辅助函数。

### 10. **其他重要文件**

- `.env`：存储环境变量的文件，不应提交到版本控制中。该文件用于配置项目运行时的敏感信息，如数据库连接字符串、API 密钥等。
- `.gitignore`：指定哪些文件或目录不应被 Git 跟踪和提交。
- `app.js`：项目的主入口文件，启动 Express 应用并加载所有中间件、路由和配置。
- `eslint.config.js`：配置 ESLint 规则，确保代码风格和质量的一致性。
- `package.json`：项目的依赖项及脚本定义，包括运行、测试、构建等任务。
- `Procfile`：Heroku 部署时所需的进程文件，定义了启动命令。
- `README.md`：项目的总体说明文件，包含项目简介、使用方法和技术架构说明。
- `setup.js`：项目初始化脚本，用于安装或设置初始状态。

---

## 📝 常见的项目操作

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 运行测试

```bash
npm test
```

### 3. 构建生产版本并启动

```bash
npm start
```

---

## 📌 总结

`cosmic-echo` 的项目结构旨在保持清晰的模块化设计，易于维护和扩展。通过合理的目录划分，开发者可以快速定位特定功能的文件，并依据需求进行定制与开发。

---