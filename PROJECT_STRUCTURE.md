# 📂 项目结构 Cosmic Echo Project Structure

为了帮助开发者快速上手并理解 **Cosmic Echo** 的项目结构，以下提供了每个主要目录的作用及其关键文件的简要说明。这份文档将引导你在项目中高效导航和定位代码。

---

## 🌳 目录概览

```plaintext
cosmic-echo/
├── .github/
├── .husky/
├── config/
├── controllers/
├── coverage/
├── locales/
├── logs/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

## 📂 目录说明

### **🛠️ .github/**
- **⚙️ workflows/**：存放 GitHub Actions 配置文件，用于项目的持续集成（CI）和持续部署（CD）自动化流程。

### **🔗 .husky/**
- 包含 Git hooks，用于在代码提交和推送前运行必要的检查（如代码风格检查、单元测试）。主要包含：
  - **✅ pre-commit**：在每次提交前执行的检查脚本。
  - **🚀 pre-push**：在推送代码前运行的钩子，确保代码推送前已通过测试。

### **⚙️ config/**
- 项目配置文件夹，包含开发环境和生产环境的配置。主要配置包括：
  - **🌱 development.json**：开发环境配置。
  - **🚢 production.json**：生产环境配置。

### **📊 controllers/**
- 控制器目录，处理 HTTP 请求并调用相应的业务逻辑服务。控制器直接处理 API 请求，并返回适当的响应。主要控制器文件包括：
  - **📅 appointmentController.js**：处理预约相关的操作（如创建、取消预约等）。
  - **🤖 chatbotController.js**：聊天机器人功能的控制器。
  - **🛠️ serviceController.js**：负责服务的创建、更新、删除操作。

### **🧪 coverage/**
- 存放自动化测试生成的覆盖率报告，帮助开发者了解项目的测试覆盖情况。生成的 HTML 报告可在 `lcov-report/` 目录下查看。

### **🌍 locales/**
- 存放项目支持的多语言翻译文件，支持不同的语言环境。主要文件包括：
  - **🇺🇸 en.json**：英文翻译文件。
  - **🇨🇳 zh.json**：中文翻译文件。

### **📝 logs/**
- 存放应用日志文件，用于记录应用运行过程中发生的操作和错误。常见日志文件：
  - **📄 app.log**：记录正常操作日志。
  - **⚠️ exceptions.log**：记录未捕获的异常或错误。

### **🛡️ middlewares/**
- 自定义中间件，用于处理请求的验证、授权等流程。关键文件包括：
  - **🔑 verifyWebhook.js**：验证外部平台（如 Facebook Messenger）的 webhook 请求合法性。
  - **🛡️ csrfProtection.js**：跨站请求伪造（CSRF）防护中间件。

### **🗂️ models/**
- 数据模型目录，定义了 MongoDB 的数据库结构和业务实体。常见模型包括：
  - **👤 userModel.js**：定义用户的字段和逻辑。
  - **📅 appointmentModel.js**：定义预约相关的数据模型。

### **🚦 routes/**
- 路由目录，定义了 API 的端点和对应的控制器，负责将 HTTP 请求映射到具体的业务逻辑。主要路由文件包括：
  - **📅 appointmentRoutes.js**：处理预约相关的请求路径。
  - **📬 facebookWebhook.js**：处理 Facebook Messenger webhook 的请求。

### **💼 services/**
- 业务服务层，封装了核心业务逻辑，处理复杂的操作和数据库交互。常见服务文件包括：
  - **📅 appointmentService.js**：负责处理预约相关的业务逻辑。
  - **💬 emotionService.js**：处理情绪分析业务逻辑。

### **🧰 utils/**
- 工具函数目录，存放常用的辅助工具和函数，包括日志、错误处理等。关键工具文件：
  - **🚨 errorHandler.js**：统一处理错误的工具函数。
  - **📝 logger.js**：日志工具，基于 `winston` 实现。

### **🔒 .env**
- 环境变量文件，存储敏感信息（如数据库连接字符串、API 密钥）。**请确保此文件未泄露到公共仓库**。

### **📜 .gitignore**
- 指定不需要提交到 Git 仓库的文件或目录（如 `node_modules/` 和 `.env`）。

### **🚀 app.js**
- 应用的主入口文件，负责加载中间件、设置路由和启动服务器。

### **📦 package.json**
- 项目的元数据文件，定义了项目的依赖、脚本命令等。

---

## 🚀 常用开发命令

项目的 `package.json` 文件中定义了多个实用脚本，帮助开发者高效进行开发和维护工作：

- **`🛠️ npm run dev`**：启动开发服务器，自动检测文件变化并重新加载。
- **`🔍 npm run lint`**：运行 ESLint 代码风格检查，保持代码一致性。
- **`🧪 npm run test`**：运行项目的单元测试，确保模块功能正常。
- **`🚀 npm start`**：在生产模式下启动应用。

---

通过这份项目结构文档，你可以快速理解 **Cosmic Echo** 的目录设计及其作用，帮助你高效导航并维护项目。该结构清晰明了，确保了代码的可读性和扩展性。