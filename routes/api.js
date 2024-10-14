// routes/api.js

const express = require("express");
const router = express.Router();

// 通用 API 路由，未来可以在此基础上扩展
router.get('/', (req, res) => {
  res.status(200).send('Welcome to Cosmic Echo API');
});

module.exports = router;