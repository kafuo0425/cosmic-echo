# 🌌 宇宙回声 Cosmic Echo - 项目结构说明

📌 **快速了解项目结构，帮助开发者快速扩展 Cosmic Echo AI小助手。**

---

## 目录概览

```plaintext
cosmic-echo/
├── config/                # 环境配置文件
├── controllers/           # 处理业务逻辑的控制器
├── locales/               # 多语言翻译文件
├── models/                # MongoDB 数据模型
├── routes/                # API 路由定义
├── services/              # 业务逻辑处理层
├── utils/                 # 工具函数与日志
├── app.js                 # 应用主入口
└── package.json           # 项目依赖与脚本管理
```

---

## 目录说明

### 📂 config/
存放项目的环境配置文件，根据不同的环境（如开发、生产环境）来加载相应的配置。

### 📂 controllers/
处理用户请求并与业务逻辑层交互。主要控制器包括：
- **chatbotController.js**：处理聊天请求并生成回复。
- **facebookController.js**：管理 Facebook Webhook 请求。
- **userController.js**：处理用户的登录、注册等操作。

### 📂 locales/
存储多语言翻译文件，支持中文、英文、马来语等多种语言。每个语言文件包含项目中所有文本的翻译。

### 📂 models/
定义 MongoDB 数据模型，确保数据的结构一致性。例如：
- **userModel.js**：定义用户数据结构。
- **userPreferencesModel.js**：保存用户的偏好设置。

### 📂 routes/
将请求路由到相应的控制器，管理应用的 API 端点。主要文件：
- **api.js**：整合所有 API 路由。
- **facebookWebhook.js**：处理 Facebook Webhook 请求。
- **whatsappWebhook.js**：处理 WhatsApp Webhook 请求。

### 📂 services/
封装核心业务逻辑，便于与控制器交互。例如：
- **emotionService.js**：分析用户情感，调整回复语气。
- **intentService.js**：识别用户需求并生成相应的回复。
- **messageService.js**：管理消息的生成和发送逻辑。

### 📂 utils/
存放工具类函数和日志管理模块，便于代码复用和系统监控。
- **helper.js**：通用辅助函数。
- **logger.js**：日志记录与管理。

---

## 主文件

### 📄 app.js
项目的主入口，负责启动 Express 服务器、连接 MongoDB 数据库并注册所有路由。

```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 连接数据库
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// 中间件与路由
app.use(express.json());
app.use('/api', require('./routes/api'));

// 启动服务器
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
```

### 📄 package.json
管理项目的依赖、版本信息与常用脚本命令。可以使用 npm 轻松安装所需依赖。

---

## 🌟 总结

希望这个项目结构说明可以帮助你快速理解 Cosmic Echo，并协助有关的开发以及扩展的工作！如果有任何问题，欢迎随时咨询。