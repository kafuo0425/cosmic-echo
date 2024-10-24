# 🌌 宇宙回声 Cosmic Echo

**宇宙回声** 是由卡芙欧（Ka Fuo）开发的智能聊天机器人，专为身心灵工作室设计。集成了多语言沟通、情绪分析、预约管理等功能，帮助你提升全球客户的服务体验。

该项目基于 **Node.js** 和 **Express.js** 构建，使用 **MongoDB** 进行数据存储，集成了 Google Cloud API 进行自然语言处理和情绪分析。项目设计模块化，具备强大的日志管理和完善的错误处理机制，确保高效、安全、且易于维护。

---

## ✨ 核心亮点

- 🌍 **多语言沟通**：集成 Google Cloud Translate API，自动检测并支持多语言（中文、英文、马来语等），为全球客户提供流畅的语言切换和服务。
- 👤 **智能用户识别**：通过历史交互与行为分析，智能识别用户状态（如首次联系、已预约等），提供个性化的互动和推荐。
- 🔍 **精准需求分析**：利用 NLP 技术，智能识别用户需求并提供定制化服务和信息。
- 💬 **情绪分析与回应**：通过情绪分析算法，机器人能检测用户的情绪波动并做出个性化回应，提升客户满意度。
- 💲 **价格透明**：实时提供清晰的价格信息，增强用户信任感。
- 🤝 **无缝转接人工客服**：智能判断用户需求，必要时无缝转接至人工客服，保障客户服务的连续性。
- 🔒 **高安全保障**：采用 JWT 进行身份认证，结合 **Helmet** 和 **express-rate-limit**，增强应用安全性，防止常见攻击。
- 📊 **日志与错误追踪**：使用 **Winston** 记录日志，并集成 **Sentry** 进行错误监控和报警，确保应用的稳定运行。

---

## 🚀 快速上手指南

### 1. 克隆项目

```bash
git clone https://github.com/yourusername/cosmic-echo.git
cd cosmic-echo
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

在项目根目录创建 `.env` 文件，配置如下：

```plaintext
PORT=9587
MONGODB_URI=your_mongodb_connection_string
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
JWT_SECRET=your_jwt_secret
SENTRY_DSN=your_sentry_dsn_key  # 可选，用于生产环境中的错误追踪
```

### 4. 启动应用

#### 开发模式

```bash
npm run dev
```

#### 生产模式

```bash
npm start
```

### 5. 运行测试

```bash
npm test
```

---

## 📊 日志与错误追踪

- **日志管理**：项目使用 **Winston** 进行日志记录，日志文件会根据日期自动轮转，存储在 `logs/` 目录中。你可以修改 `utils/logger.js` 配置，定制日志级别和输出方式。
- **错误追踪**：在生产环境中集成 **Sentry**，用于捕获和报告未处理的异常。请确保在 `.env` 文件中配置 `SENTRY_DSN` 以启用此功能。

---

## 💻 技术架构

- **后端框架**：Node.js, Express.js
- **数据库**：MongoDB，使用 Mongoose 进行对象数据建模 (ODM)
- **NLP 支持**：集成 Google Cloud Translate API 和情绪分析算法
- **认证与安全**：JWT 身份认证，结合 **Helmet** 和 **express-rate-limit** 增强安全性
- **日志管理**：使用 **Winston** 管理日志，支持日志轮转和多级别日志记录
- **错误追踪**：集成 **Sentry** 实时监控生产环境中的错误
- **测试框架**：使用 **Jest** 进行单元和集成测试
- **代码质量保障**：通过 **ESLint** 和 **Prettier** 进行代码检查和格式化，使用 **eslint-plugin-security** 增强代码安全
- **持续集成**：通过 **GitHub Actions** 实现自动化 CI/CD 流程，确保代码质量和稳定性

---

## 🛠️ 项目优化建议

1. **外部 API 错误处理**：增加外部 API 调用（如 Google Cloud API）的超时处理和重试机制，提升系统健壮性。
2. **日志系统扩展**：根据日志级别（如 debug、info、error）动态调整输出日志，特别是在生产环境下提供更详细的错误日志。
3. **高并发优化**：结合缓存（如 Redis）和数据库查询优化，在高并发场景下提升性能表现。
4. **自动化测试覆盖率**：进一步扩展测试覆盖范围，特别是在多语言支持和情绪分析模块上，确保系统在各种场景下的稳定运行。
5. **安全性增强**：引入更多 JWT 的安全性措施，防止 token 劫持或篡改，并强制使用 HTTPS。

---

## 📂 项目结构

```
cosmic-echo/
├── config/          # 配置文件（多环境支持）
├── controllers/     # 控制器逻辑
├── models/          # 数据模型定义
├── routes/          # API 路由定义
├── services/        # 业务逻辑与外部 API 交互
├── utils/           # 工具模块（日志、错误处理等）
│   ├── logger.js    # 日志系统配置
│   ├── errorHandler.js # 全局错误处理逻辑
│   └── helper.js    # 通用工具函数
└── app.js           # 应用入口文件
```

---

## 🌍 部署方式

### 1. 本地部署

```bash
git clone https://github.com/yourusername/cosmic-echo.git
cd cosmic-echo
npm install
npm run dev
```

### 2. Docker 部署

```bash
docker build -t cosmic-echo .
docker run -d -p 9587:9587 --env-file .env cosmic-echo
```

### 3. Heroku 部署

```bash
heroku login
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_connection_string
git push heroku main
```

---

## 🤝 贡献指南

1. Fork 本项目并创建新分支：

```bash
git checkout -b feature/your-feature-name
```

2. 提交更改并推送：

```bash
git commit -m "Add your message"
git push origin feature/your-feature-name
```

3. 创建 Pull Request 并描述更改内容。

---

## 📧 联系我们

有任何问题或建议，欢迎通过 [issues](https://github.com/kafuo0425/cosmic-echo/issues) 联系我们。

---