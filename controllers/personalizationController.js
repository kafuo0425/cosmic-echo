// controllers/personalizationController.js

exports.getPersonalizedMessage = async (req, res) => {
  try {
    const { preferences } = req.body;
    if (!preferences) {
      logger.warn('Preferences are missing');
      return res.status(400).send({ error: 'Preferences are required' });
    }

    const message = `Personalized message based on preferences: ${JSON.stringify(preferences)}`;
    res.status(200).send({ message });
  } catch (error) {
    logger.error('Error processing personalized message:', error);
    res.status(500).send('Processing failed');
  }
};