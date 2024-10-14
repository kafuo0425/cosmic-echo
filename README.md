# 宇宙回声 Cosmic Echo 🌌

一款多语言、多平台的智能聊天机器人，帮助高维空间实现更高效的灵性与情感引导。

## 项目简介

宇宙回声 Cosmic Echo 是一款专为高维空间（High-Dimensional Space）打造的智能聊天机器人。它深度集成了 Facebook Messenger 和 WhatsApp Business，帮助灵性导师 Ka Fuo（卡芙欧）在繁忙或离线时与客户保持联系。机器人支持中文、英文和马来语，提供灵性引导、情感支持和宠物情感分析服务。

## 项目亮点

- **🌐 多语言支持**：自动识别并切换中文、英文和马来语，满足全球用户的需求。
- **🔮 灵性引导**：提供深度的灵性咨询和情感支持，帮助用户找到内在的平静与力量。
- **🐾 宠物情感分析**：基于 Ka Fuo 的经验，帮助宠物主人更好地理解宠物的情感和行为。
- **🤖 无缝集成**：与 Facebook Messenger 和 WhatsApp Business 完美结合，随时提供服务。
- **⚙️ 自动化与扩展性**：基于 Node.js 和 MongoDB 开发，具备良好的扩展性，支持未来功能的更新和优化。

## 目录

- [项目背景](#项目背景)
- [功能特性](#功能特性)
- [安装与运行](#安装与运行)
- [API 与 Webhook](#api-与-webhook)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [贡献](#贡献)
- [许可](#许可)

## 项目背景

高维空间（High-Dimensional Space）由灵性导师 Ka Fuo（卡芙欧）创立，致力于通过洞察灵性和情感，建立人与自然、人与动物之间的深层联系。为了更好地与客户无缝沟通，宇宙回声 Cosmic Echo 被设计为一个可以代替真人客服的智能聊天机器人，提供灵性引导、宠物情感分析及日常预约管理服务。

## 功能特性

1. **多语言支持**
   - 支持中文、英文和马来语，自动识别用户语言。
   - 提供专业的灵性引导和宠物情感分析。

2. **用户身份与需求识别**
   - 自动识别新用户、已预约用户和潜在客户。
   - 根据用户状态，提供个性化的问候和服务建议。

3. **服务类别区分**
   - 准确识别用户需求，提供相应的信息。
   - 引导用户探索更深层次的灵性支持或宠物情感服务。

4. **情感感知与反馈**
   - 通过分析用户语言，感知情绪（如开心、焦虑、悲伤等），并提供适当的支持。

5. **转接真人客服**
   - 当用户有特殊需求时，机器人可将对话转接至真人客服，确保服务顺畅。

## 安装与运行

### 环境要求

- Node.js 版本 >=14 <19
- MongoDB 数据库

### 安装步骤

1. **克隆项目代码**：

   ```bash
   git clone https://github.com/your-username/cosmic-echo.git
   cd cosmic-echo
   ```

2. **安装依赖**：

   ```bash
   npm install
   ```

3. **配置环境变量**：
   根据项目根目录下的 `.env.example` 文件，创建 `.env` 文件并填写必要信息。

   ```env
   FACEBOOK_APP_ID=your_facebook_app_id
   FACEBOOK_APP_SECRET=your_facebook_app_secret
   FACEBOOK_PAGE_ACCESS_TOKEN=your_facebook_page_access_token
   WHATSAPP_API_KEY=your_whatsapp_api_key
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **启动项目**：

   ```bash
   npm run dev
   ```

5. **运行测试**：
   项目集成了 jest 单元测试，可以通过以下命令运行：

   ```bash
   npm run test
   ```

## API 与 Webhook

项目通过 API 与 Facebook 和 WhatsApp 集成，处理消息传递与自动回复。

### Facebook Messenger Webhook

- **路径**：`/facebook-webhook`
- **功能**：处理来自 Facebook 的消息和事件。

### WhatsApp Business Webhook

- **路径**：`/whatsapp-webhook`
- **功能**：处理来自 WhatsApp Business 的消息和事件。

## 技术栈

- **后端**：Node.js, Express
- **数据库**：MongoDB
- **多语言支持**：i18next
- **API 集成**：Facebook Messenger API, WhatsApp API
- **日志管理**：Winston

## 项目结构

```bash
cosmic-echo/
├── config/                # 配置文件
├── controllers/           # 控制器，处理 API 请求
├── locales/               # 多语言支持的翻译文件
├── models/                # 数据模型（MongoDB）
├── routes/                # 路由，定义 API
├── services/              # 服务层，处理业务逻辑
├── utils/                 # 工具类文件，日志等辅助函数
├── app.js                 # 应用入口文件
└── package.json           # 项目依赖和配置信息
```

## 贡献

欢迎大家对宇宙回声 Cosmic Echo 提出建议或贡献代码。开始贡献之前，请先提交 issue 或通过 pull request 进行代码提交。

### 提交代码步骤

1. **Fork 本项目**到您的 GitHub 账户。
2. **创建一个分支**：`git checkout -b feature-branch`。
3. **提交代码**：`git commit -m 'Add some feature'`。
4. **推送分支**：`git push origin feature-branch`。
5. **提交 Pull Request**。

## 许可

本项目遵循 MIT License。您可以自由修改和分发本项目代码，但需保留原作者的许可声明。

---

让我们一起用心聆听宇宙的回声，走向灵性与情感的深度连接！