// services/languageService.js

const i18next = require('i18next');
const enTranslations = require('../locales/en.json');
const zhTranslations = require('../locales/zh.json');
const msTranslations = require('../locales/ms.json');

// 初始化 i18next 语言支持
const initI18n = () => {
    i18next.init({
        lng: 'zh',  // 默认语言为中文
        fallbackLng: 'zh',  // 中文为回退语言
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

// 动态检测用户语言，并提醒
const detectLanguageAndNotify = (message, res) => {
    const lang = detectLanguage(message);
    if (lang !== 'zh') {
        res.send({
            message: '所有课程和服务将以中文提供，请使用中文进行交流。',
            translatedMessage: translate('language_notice', { lng: lang }) // 提示消息的翻译
        });
    }
    return lang;
};

// 动态检测语言
const detectLanguage = (message) => {
    if (/[\u4e00-\u9fa5]/.test(message)) {
        return 'zh';  // 如果消息中有中文字符，判定为中文
    } else if (/[a-zA-Z]/.test(message)) {
        return 'en';  // 英语
    } else if (/[\u0100-\u017F]/.test(message)) {
        return 'ms';  // 马来语
    }
    return 'zh';  // 默认中文
};

module.exports = {
    initI18n,
    detectLanguageAndNotify,
    detectLanguage
};
