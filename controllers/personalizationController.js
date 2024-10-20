const personalizationService = require("../services/personalizationService");
const { detectLanguageAndNotify } = require("../services/languageService");
const logger = require("../utils/logger");

exports.getPersonalizedMessage = async (req, res) => {
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