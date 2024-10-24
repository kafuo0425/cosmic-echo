import personalizationService from '../services/personalizationService';
import { detectLanguageAndNotify } from '../services/languageService';
import logger from '../utils/logger';

export const getPersonalizedMessage = async (req, res) => {
  try {
    const { preferences, userId, message } = req.body;

    const lang = detectLanguageAndNotify(message, res);

    if (lang === "zh") {
      const personalizedMessage =
        await personalizationService.generatePersonalizedResponse(
          message,
          preferences,
          userId,
        );
      res.status(200).json({ message: personalizedMessage });
    } else {
      res.status(400).json({
        message:
          "Personalization is currently only available in Chinese. Please switch to Chinese for communication.",
      });
    }
  } catch (error) {
    logger.error("Error processing personalized message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};