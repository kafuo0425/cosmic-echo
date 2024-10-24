import i18next from 'i18next';
import enTranslations from '../locales/en.json';
import zhTranslations from '../locales/zh.json';
import msTranslations from '../locales/ms.json';

const initI18n = () => {
  i18next.init({
    lng: "zh",
    fallbackLng: "zh",
    resources: {
      en: {
        translation: enTranslations,
      },
      zh: {
        translation: zhTranslations,
      },
      ms: {
        translation: msTranslations,
      },
    },
  });
};

import translate from '../external/translate';

const detectLanguageAndNotify = (message, res) => {
  const lang = detectLanguage(message);
  if (lang !== "zh") {
    res.send({
      message: "所有课程和服务将以中文提供，请使用中文进行交流。",
      translatedMessage: translate("language_notice", { lng: lang }),
    });
  }
  return lang;
};

const detectLanguage = (message) => {
  if (/[\u4e00-\u9fa5]/.test(message)) {
    return "zh";
  } else if (/[a-zA-Z]/.test(message)) {
    return "en";
  } else if (/[\u0100-\u017F]/.test(message)) {
    return "ms";
  }
  return "zh";
};

export const initI18n = initI18n;
export const detectLanguageAndNotify = detectLanguageAndNotify;
export const detectLanguage = detectLanguage;