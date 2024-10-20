# 📂 项目结构 Cosmic Echo Project Structure

为了更好地理解 Cosmic Echo 项目的整体结构，以下是项目的目录说明。每个目录的用途和包含的文件都列了出来，帮助开发者更快上手和理解代码组织方式。

---

## 🌳 目录结构

```
cosmic-echo/
├── .github/
│   └── workflows/
│       └── ci.yml  # GitHub Actions 配置文件，用于 CI/CD 流程
├── .husky/  # Git hooks 配置，用于代码提交检查
│   ├── pre-commit  # 提交前的脚本
│   ├── pre-push  # 推送前的脚本
│   └── _/
│       └── ... (其他 Husky 配置文件)
├── config/  # 配置文件
│   ├── courses.json  # 课程配置
│   ├── default.json  # 默认配置
│   ├── development.json  # 开发配置
│   ├── production.json  # 生产配置
│   └── services.json  # 服务配置
├── controllers/  # 控制器，处理 HTTP 请求
│   ├── appointmentController.js  # 预约控制器
│   ├── chatbotController.js  # 聊天机器人控制器
│   └── ... (其他控制器)
├── coverage/  # 测试覆盖率报告
│   ├── lcov-report/  # HTML 测试报告
│   └── ... (其他覆盖率文件)
├── locales/  # 多语言支持
│   ├── en.json  # 英文语言包
│   ├── ms.json  # 马来语语言包
│   └── zh.json  # 中文语言包
├── logs/  # 日志文件
│   ├── app.log  # 应用日志
│   ├── error.log  # 错误日志
│   └── ... (其他日志文件)
├── middlewares/  # 中间件，处理请求前后的逻辑
│   └── verifyWebhook.js  # Webhook 验证中间件
├── models/  # 数据模型
│   ├── userModel.js  # 用户模型
│   ├── appointmentModel.js  # 预约模型
│   └── ... (其他模型)
├── routes/  # 路由，处理不同 URL 的请求
│   ├── api.js  # API 路由
│   ├── appointmentRoutes.js  # 预约路由
│   └── ... (其他路由)
├── services/  # 服务层，包含业务逻辑
│   ├── appointmentService.js  # 预约服务
│   ├── chatbotService.js  # 聊天机器人服务
│   └── ... (其他服务)
├── utils/  # 工具函数
│   ├── errorHandler.js  # 错误处理工具
│   ├── helper.js  # 辅助函数
│   └── logger.js  # 日志工具
├── .env  # 环境变量配置文件
├── .gitignore  # Git 忽略文件配置
├── app.js  # 应用入口文件
├── eslint.config.cjs  # ESLint 配置文件，用于代码检查
├── package.json  # 项目依赖和脚本
├── Procfile  # Heroku 部署配置
├── PROJECT_STRUCTURE.md  # 项目结构说明（当前文件）
└── README.md  # 项目说明文件
```

---

## 📂 目录说明

- **.github/**：包含 GitHub Actions 工作流配置文件，用于持续集成和部署（CI/CD）。
- **.husky/**：配置 Git hooks，用于代码提交前的检查，确保代码质量。
- **config/**：不同环境的配置文件，包括课程和服务的设置。
- **controllers/**：控制器文件，处理请求和响应，是核心业务逻辑所在。
- **coverage/**：测试覆盖率报告，帮助了解代码的测试情况。
- **locales/**：多语言文件，支持应用的国际化，包括中文、英文和马来语。
- **logs/**：存放运行日志，包括错误和调试信息，便于问题排查。
- **middlewares/**：中间件文件，在请求到达控制器前或后进行处理。
- **models/**：数据模型文件，定义数据库结构。
- **routes/**：定义 API 路由，将请求分发到相应控制器。
- **services/**：服务层文件，包含业务逻辑，与控制器协作实现功能。
- **utils/**：工具函数文件，提供错误处理和日志记录等功能。
- **.env**：环境变量配置文件，存储敏感信息和设置。
- **app.js**：应用入口文件，启动服务器并加载配置。
- **package.json**：项目依赖和脚本，管理项目的元数据。
- **Procfile**：Heroku 部署配置，定义如何启动应用。
- **README.md**：项目的总体介绍和使用指南。

---

希望以上项目结构说明可以帮助你快速了解和使用 Cosmic Echo 项目。如有任何问题，欢迎贡献或提交意见！
