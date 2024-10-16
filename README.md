# 宇宙回声 Cosmic Echo - 🤖 智能聊天机器人

## 🌟 项目简介

**宇宙回声 Cosmic Echo** 是一款多功能智能聊天机器人，旨在为“高维空间”工作室提供客户服务。它支持自动回复客户问题、处理课程咨询、预约服务及情感分析，具备多语言能力（中文、英语、马来语）、智能用户识别和情绪感知等功能。

### 🌈 核心功能

1. **🌍 多语言支持**
   - 自动识别用户语言（中文、英语、马来语）并提供相应回复。
   - 重要信息（如预约与课程）优先使用中文。

2. **👤 用户识别与个性化服务**
   - **首次联系用户**：提供欢迎信息并介绍课程和服务。
   - **已预约用户**：提醒待付款或未完成的课程。
   - **潜在用户**：提供详细服务信息，引导进一步了解。

3. **📅 课程咨询与预约**
   - 自动回复课程详细信息，包括时间、费用、内容和报名链接。
   - 根据用户查询生成动态回复。

4. **💖 情绪感知与情感支持**
   - 识别用户情绪（如开心、焦虑）并提供相应的情感回应。

5. **👥 转接真人客服**
   - 用户可请求转接至真人客服，机器人会自动完成转接。

## 📂 项目结构

```
cosmic-echo/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .husky/
│   ├── pre-commit
│   └── pre-push
├── config/
│   ├── courses.json
│   ├── default.json
│   ├── development.json
│   ├── production.json
│   └── services.json
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
├── locales/
│   ├── en.json
│   ├── ms.json
│   └── zh.json
├── logs/
│   └── app.log
├── middlewares/
│   └── verifyWebhook.js
├── models/
│   ├── index.js
│   ├── userModel.js
│   └── userPreferencesModel.js
├── routes/
│   ├── api.js
│   ├── appointmentRoutes.js
│   ├── courseRoutes.js
│   ├── facebookWebhook.js
│   ├── personalizationWebhook.js
│   ├── serviceRoutes.js
│   └── whatsappWebhook.js
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
├── utils/
│   ├── errorHandler.js
│   ├── helper.js
│   └── logger.js
├── .env
├── .gitignore
├── app.js
├── package.json
├── PROJECT_STRUCTURE.md
└── README.md
```

## 💻 环境要求

- Node.js 18.x 或更高版本
- MongoDB 5.x 或更高版本（用于用户和会话数据持久化）

## 🚀 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/cosmicecho.git
   cd cosmicecho
   ```
   > 请替换为您的 GitHub 用户名。

2. **安装依赖**
   ```bash
   npm install
   ```
   > 需要网络连接，确保依赖安装顺利。如遇错误，请检查网络或尝试重新安装。

3. **配置环境变量**
   在项目根目录下创建 `.env` 文件，并根据需要配置以下变量：
   ```env
   PORT=9587
   NODE_ENV=development
   DB_URL=mongodb://localhost:27017/cosmicecho
   # 其他环境变量
   ```

4. **启动项目**
   ```bash
   npm start
   ```
   或者在开发模式下运行：
   ```bash
   npm run start:dev
   ```

## 📖 使用方法

1. **访问 API**
   - 课程信息 API 示例: `GET /api/course-info/:courseKey`
   - 例如：`GET /api/course-info/pet_emotion_course`

2. **处理课程咨询**
   - 机器人自动生成课程详细信息的回复，包括时间、地点、费用等。
   - 示例查询：“课程费用是多少？”会得到类似回复：
     ```
     课程费用为：
     💵 常规费用：RM 2880.00
     💵 提前报名：RM 2580.00
     💵 组合优惠：RM 2330.00/人（两人或以上）
     ```

3. **🌐 多语言支持**
   - 自动识别用户语言并提供相应回复，支持中文、英语、马来语。

4. **💞 情感支持**
   - 当检测到用户情绪低落或焦虑时，自动提供情感支持信息。

## 📂 Git Hooks 配置

- **Husky**：用于管理 Git 钩子，确保提交和推送代码前执行 `lint` 和 `test`。
- **pre-commit**：运行 `lint-staged`，检查代码并修复格式。
- **pre-push**：运行测试套件，确保代码稳定性。

## ❓ 常见问题

### 🧐 如何添加新课程？
1. 打开 `config/courses.json` 文件。
2. 按照现有格式添加新的课程条目，例如：
   ```json
   {
     "courseKey": "new_course",
     "name": "新课程名称",
     "dates": ["2024-01-01", "2024-02-01"],
     "pricing": {
       "regular": 3000,
       "earlyBird": 2700,
       "groupDiscount": 2500
     }
   }
   ```
3. 确保在 `controllers/courseController.js` 中正确处理新课程的路由。

### 🛠️ 如何修改现有课程信息？
1. 打开 `config/courses.json` 文件。
2. 找到需要修改的课程条目，编辑相应字段如 `dates`、`pricing` 等。

### 🧪 如何测试 API？
可以使用 Postman 或 curl 测试 API。例如，获取宠物情感课程信息：
```bash
curl http://localhost:9587/api/course-info/pet_emotion_course
```

## 🤝 贡献

欢迎提交 Issues 或 Pull Requests 来改进此项目。如有任何问题或建议，可以通过 GitHub 与我联系。

## 📜 许可证

MIT License