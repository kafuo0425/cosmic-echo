/* eslint-disable no-console */
// services/languageService.js

const i18next = require("i18next");
const enTranslations = require("../locales/en.json");
const zhTranslations = require("../locales/zh.json");
const msTranslations = require("../locales/ms.json");

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

module.exports = { initI18n, detectLanguageAndNotify, detectLanguage };
