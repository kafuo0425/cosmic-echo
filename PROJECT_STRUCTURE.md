# 📁 项目结构 Cosmic Echo

```
cosmic-echo/
│
├── .env
├── .gitignore
├── app.js
├── package.json
├── PROJECT_STRUCTURE.md
├── README.md
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .husky/
│   ├── pre-commit
│   └── pre-push
│
├── config/
│   ├── courses.json
│   ├── default.json
│   ├── development.json
│   ├── production.json
│   └── services.json
│
├── controllers/
│   ├── appointmentController.js
│   ├── chatbotController.js
│   ├── courseController.js
│   ├── customerServiceController.js
│   ├── facebookController.js
│   ├── personalizationController.js
│   ├── serviceController.js
│   ├── userController.js
│   └── whatsappController.js
│
├── locales/
│   ├── en.json
│   ├── ms.json
│   └── zh.json
│
├── logs/
│   └── app.log
│
├── middlewares/
│   └── verifyWebhook.js
│
├── models/
│   ├── index.js
│   ├── userModel.js
│   └── userPreferencesModel.js
│
├── routes/
│   ├── api.js
│   ├── appointmentRoutes.js
│   ├── courseRoutes.js
│   ├── facebookWebhook.js
│   ├── personalizationWebhook.js
│   ├── serviceRoutes.js
│   └── whatsappWebhook.js
│
├── services/
│   ├── appointmentService.js
│   ├── courseService.js
│   ├── customerService.js
│   ├── emotionService.js
│   ├── intentService.js
│   ├── languageService.js
│   ├── messageService.js
│   ├── personalizationService.js
│   ├── pricingService.js
│   ├── serviceService.js
│   ├── userService.js
│   └── webhookService.js
│
└── utils/
    ├── errorHandler.js
    ├── helper.js
    └── logger.js
```

## 📂 目录与文件说明

### 🛠️ 根目录文件

- **.env**：🔒 存储环境变量（如数据库连接字符串、API 密钥等）。
  - 示例：
    ```
    DATABASE_URL=mongodb://localhost:27017/cosmic-echo
    API_KEY=your_api_key_here
    ```
- **.gitignore**：📜 列出应被 Git 忽略的文件（如 `node_modules/`）。
- **app.js**：🚀 项目的主要入口文件，初始化 Express 应用程序，加载中间件、路由，并启动服务器。
- **package.json**：📒 项目的包管理文件，包含依赖库、脚本命令等信息。
- **PROJECT_STRUCTURE.md**：🗒️ 解释项目的结构和每个模块的功能。
- **README.md**：📑 项目的简要说明，包含如何运行项目的说明和其他相关信息。

### 🐙 .github/

- **workflows/**：存储 GitHub Actions 工作流文件。
  - **ci.yml**：📈 持续集成工作流配置，自动运行 `lint` 和 `test`。

### 🔧 .husky/

- **pre-commit**：🔍 提交前运行 `lint-staged` 进行代码检查和格式修复。
- **pre-push**：🚀 推送前运行测试套件，确保代码稳定。

### 📂 config/

存储应用的配置信息，按照不同的环境（如开发、生产）进行配置。

- **courses.json**：🎓 存储所有课程的信息（如课程名称、日期、价格等）。
- **services.json**：🧐 存储所有服务的信息（如宠物情感分析、能量疗愈等）。
- **default.json**、**development.json**、**production.json**：🤖 针对不同运行环境的配置文件，包含数据库连接、API 密钥等环境相关的配置信息。
  - 示例配置：
    ```json
    {
      "database": {
        "host": "localhost",
        "port": 27017,
        "name": "cosmic-echo"
      },
      "api": {
        "key": "your_api_key_here"
      }
    }
    ```

### 🎛️ controllers/

存储控制器文件，负责处理客户端的请求并调用服务层逻辑。

- **appointmentController.js**、**chatbotController.js** 等：📦 处理不同功能模块的请求逻辑。
  - 示例：
    ```javascript
    // appointmentController.js
    const AppointmentService = require('../services/appointmentService');
    
    exports.createAppointment = async (req, res) => {
      try {
        const appointment = await AppointmentService.create(req.body);
        res.status(201).json(appointment);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    ```

### 🌐 locales/

存储多语言支持的翻译文件，提供英文、马来文、中文等语言包。

- **en.json**：🇬🇧 英文翻译文件。
- **ms.json**：🇲🇾 马来文翻译文件。
- **zh.json**：🇨🇳 中文翻译文件。

### 📜 logs/

存储日志文件，记录应用程序运行中的关键事件和错误。

- **app.log**：📝 记录应用程序的日志，用于调试和分析问题。

### 🔗 middlewares/

存储中间件函数，用于处理请求的预处理逻辑。

- **verifyWebhook.js**：🛡️ 验证来自第三方平台的 Webhook 请求的合法性（如 Facebook、WhatsApp 的 Webhook）。

### 📊 models/

存储与数据库相关的数据模型定义，使用 Mongoose 连接 MongoDB。

- **index.js**：🗒️ 导入和汇总所有数据模型。
- **userModel.js**、**userPreferencesModel.js**：👤 定义用户相关的数据模型。
  - 示例：
    ```javascript
    // userModel.js
    const mongoose = require('mongoose');
    
    const UserSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
    });
    
    module.exports = mongoose.model('User', UserSchema);
    ```

### 🛣️ routes/

存储路由文件，用于定义 API 接口。

- **api.js**：🛣️ API 的主路由文件，将各子路由引入汇总。
- **courseRoutes.js**、**serviceRoutes.js** 等：🎓🧘‍♀️ 定义具体功能模块的路由。
- **facebookWebhook.js**、**whatsappWebhook.js**：📻📞 处理 Facebook 和 WhatsApp 平台的 Webhook 路由。
- **personalizationWebhook.js**：💡 个性化推荐和情感分析的 Webhook 路由。

### 💡 services/

存储服务层的逻辑，负责业务处理和数据操作。

- **appointmentService.js**、**courseService.js** 等：🎓🧘‍♀️ 实现不同功能模块的业务逻辑。
- **userService.js**：👤 处理用户信息的增删改查、登录注册等逻辑。
- **webhookService.js**：🛣️ 处理外部平台（如 Facebook 和 WhatsApp）的 Webhook 请求。
  - 示例：
    ```javascript
    // userService.js
    const User = require('../models/userModel');
    
    exports.createUser = async (userData) => {
      const user = new User(userData);
      return await user.save();
    };
    ```

### 🥇 utils/

存储辅助工具函数和公共模块。

- **errorHandler.js**：⚠️ 全局错误处理模块，用于捕获和处理应用中的错误。
- **helper.js**：🤖 常用工具函数库，提供通用的辅助功能。
- **logger.js**：💻 日志模块，使用 **Winston** 管理日志记录。

## 🛠️ 优化与配置

### 1. Husky 配置

- **预提交钩子**：`.husky/pre-commit` 运行 `lint-staged` 进行代码格式修复和检查。
- **预推送钩子**：`.husky/pre-push` 运行 `npm test` 确保代码通过测试。

### 2. lint-staged 配置

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "git add"
  ]
}
```

### 3. 持续集成 (CI)

- **GitHub Actions**：`.github/workflows/ci.yml` 自动运行 `lint` 和 `test`，确保代码质量和稳定性。

## 🚀 运行与开发

### 安装依赖

```bash
npm install
```

### 运行开发环境

```bash
npm run start:dev
```

### 运行生产环境

```bash
npm start
```

### 运行测试

```bash
npm test
```

### 格式化代码

```bash
npm run format
```

## 🔄 依赖管理

- **定期更新**：使用 `npm-check-updates` 工具定期检查和更新项目依赖。
- **安全审计**：运行 `npm audit` 检查并修复安全漏洞。

## 📄 文档与资源

- **README.md**：项目简介、安装与运行指南、功能说明等。
- **PROJECT_STRUCTURE.md**：详细的项目目录结构与文件说明。
- **持续集成配置**：`.github/workflows/ci.yml`。
- **Husky 配置**：`.husky/pre-commit` 和 `.husky/pre-push`。