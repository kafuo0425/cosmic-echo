// controllers/facebookController.js

exports.verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === process.env.FACEBOOK_VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    logger.warn('Failed verification attempt');
    res.status(403).send('Forbidden');
  }
};

exports.handleMessage = (req, res) => {
  try {
    const body = req.body;

    if (body.object === 'page') {
      const entryPromises = body.entry.map(async (entry) => {
        const sender = entry.messaging[0].sender.id;
        const message = entry.messaging[0].message.text;
        const responseMessage = `Received message: ${message} from sender: ${sender}`;

        logger.info('Received Facebook message:', message);
        // 这里添加逻辑，如调用服务回复消息
        return responseMessage;
      });

      Promise.all(entryPromises)
        .then((responses) => res.status(200).send({ messages: responses }))
        .catch((error) => {
          logger.error('Error handling Facebook message:', error);
          res.status(500).send('Error processing message');
        });
    } else {
      res.status(404).send('Not a valid Facebook message');
    }
  } catch (error) {
    logger.error('Error processing Facebook message:', error);
    res.status(500).send('Processing failed');
  }
};