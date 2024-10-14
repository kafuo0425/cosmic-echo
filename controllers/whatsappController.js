// controllers/whatsappController.js

const receiveMessage = (req, res) => {
  const { body } = req;

  // 处理接收到的 WhatsApp 消息
  console.log('Received WhatsApp message:', body);

  // 回复成功
  res.status(200).send('WhatsApp message received');
};

module.exports = {
  receiveMessage,
};
