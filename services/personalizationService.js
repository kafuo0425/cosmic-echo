// services/personalizationService.js

exports.generatePersonalizedResponse = (template, preferences) => {
    let personalizedResponse = template;

    if (preferences.name) {
        personalizedResponse = personalizedResponse.replace("[客户姓名]", preferences.name);
    }

    if (preferences.serviceName) {
        personalizedResponse = personalizedResponse.replace("[服务名称]", preferences.serviceName);
    }

    return personalizedResponse;
};
