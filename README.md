# 🌌 宇宙回声 Cosmic Echo

宇宙回声是一款智能聊天机器人，旨在帮助高维空间（High-Dimensional Space）身心灵工作室的客服人员，快速、高效地满足多样化的客户需求。

无论是预约处理、课程报名，还是多语言沟通和情绪分析，宇宙回声都提供贴心、友好的支持，确保每位客户的需求都能得到及时回应。

---

## ✨ 功能特点

- 🌍 **多语言支持**：支持中文、英文和马来语，并能自动检测用户语言。
- 👥 **用户识别与分类**：区分新用户、已有预约的用户和对服务感兴趣的用户。
- 🛠️ **服务类别识别**：识别用户咨询的服务类型，如身心灵服务或宠物行为分析。
- 🔍 **信息需求识别**：判断用户询问的是服务内容还是课程安排。
- 💬 **情绪理解与反馈**：识别用户情绪，并给出适当的回应。
- 💲 **价格询问处理**：回答用户关于价格和费用的提问。
- 🤝 **转接真人客服**：在需要时无缝转接到真人客服。
- ⚡ **高可用性**：确保聊天机器人持续运行，并能从中断中恢复。

---

## 🛠️ 技术架构

- **后端**：Node.js, Express.js
- **数据库**：MongoDB (使用 Mongoose)
- **自然语言处理**：Google Cloud Translate API，情绪分析
- **认证**：JSON Web Tokens (JWT)
- **日志记录**：Winston
- **测试**：Jest
- **部署**：Heroku，使用 GitHub Actions 实现 CI/CD
- **版本控制**：GitHub
- **Webhooks**：Facebook Messenger, WhatsApp Business
- **预约系统**：Setmore

---

## 🚀 安装步骤

1. **克隆项目**

   ```bash
   git clone https://github.com/yourusername/cosmic-echo.git
   cd cosmic-echo
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **配置环境变量**

   - 在项目根目录创建 `.env` 文件，添加以下内容：
     ```
     PORT=9587
     MONGODB_URI=your_mongodb_connection_string
     GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
     FACEBOOK_VERIFY_TOKEN=your_facebook_verify_token
     FACEBOOK_PAGE_ACCESS_TOKEN=your_facebook_page_access_token
     WHATSAPP_VERIFY_TOKEN=your_whatsapp_verify_token
     WHATSAPP_API_URL=your_whatsapp_api_url
     WHATSAPP_API_TOKEN=your_whatsapp_api_token
     ```

4. **运行应用**

   - 开发模式：
     ```bash
     npm run dev
     ```
   - 生产模式：
     ```bash
     npm start
     ```

5. **运行测试**
   ```bash
   npm test
   ```

---

## 🌍 部署指南

应用已部署在 Heroku 上，以下是本地部署步骤：

1. **登录 Heroku**

   ```bash
   heroku login
   ```

2. **创建 Heroku 应用**

   ```bash
   heroku create your-app-name
   ```

3. **设置 Heroku 环境变量**

   ```bash
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   heroku config:set GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
   heroku config:set FACEBOOK_VERIFY_TOKEN=your_facebook_verify_token
   heroku config:set FACEBOOK_PAGE_ACCESS_TOKEN=your_facebook_page_access_token
   heroku config:set WHATSAPP_VERIFY_TOKEN=your_whatsapp_verify_token
   heroku config:set WHATSAPP_API_URL=your_whatsapp_api_url
   heroku config:set WHATSAPP_API_TOKEN=your_whatsapp_api_token
   ```

4. **推送代码到 Heroku**
   ```bash
   git push heroku main
   ```

---

## 🤝 贡献指南

欢迎任何形式的贡献！请提交问题或创建拉取请求以改进项目或修复错误。

---

## 📄 许可证

本项目采用 MIT 许可证。