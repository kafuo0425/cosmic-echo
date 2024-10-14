// services/languageService.js

const i18next = require('i18next');
const enTranslations = require('../locales/en.json');
const zhTranslations = require('../locales/zh.json');
const msTranslations = require('../locales/ms.json');

// 初始化 i18next 语言支持
const initI18n = () => {
  i18next.init({
    lng: 'en', // 默认语言为英语，可根据需要动态设置
    resources: {
      en: {
        translation: enTranslations,
      },
      zh: {
        translation: zhTranslations,
      },
      ms: {
        translation: msTranslations,
      }
    }
  });
};

// 设置当前语言
const setLanguage = (language) => {
  i18next.changeLanguage(language);
};

// 进行翻译
const translate = (key, params) => {
  return i18next.t(key, params);
};

module.exports = {
  initI18n,
  setLanguage,
  translate,
};