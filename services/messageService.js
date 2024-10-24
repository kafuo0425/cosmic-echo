import languageService from './languageService';
import intentService from './intentService';
import emotionService from './emotionService';

export const processMessage = async (message) => {
  try {
    const language = languageService.detectLanguage(message);
    const intent = intentService.detectIntent(message);
    const emotion = emotionService.analyzeEmotion(message);

    return { language, intent, emotion };
  } catch (error) {
    console.error("Error processing message:", error);
    throw new Error("Message processing failed");
  }
};