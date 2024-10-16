// services/serviceService.js

const servicesConfig = require('../config/services.json');

class ServiceService {
    getServiceCategoryDetails(categoryKey) {
        try {
            const serviceCategory = servicesConfig.services[categoryKey];
            if (!serviceCategory) {
                throw new Error(`无法找到指定的服务类别：${categoryKey}`);
            }

            return {
                category: serviceCategory.category,
                description: serviceCategory.description,
                services: serviceCategory.services.map(service => `${service.name}: ${service.description}`).join("\n")
            };
        } catch (error) {
            console.error("获取服务类别详情时出错:", error);
            return `服务类别获取失败，请稍后重试。`;
        }
    }

    generateServiceResponse(categoryKey, userQuery) {
        const serviceDetails = this.getServiceCategoryDetails(categoryKey);
        if (typeof serviceDetails === 'string') {
            return serviceDetails;
        }

        if (userQuery.includes("价格") || userQuery.includes("费用")) {
            return this.generatePriceResponse(categoryKey);
        }

        return `
        🌟 ${serviceDetails.category} 🌟\n
        描述：${serviceDetails.description}\n
        提供的服务：\n${serviceDetails.services}
        `;
    }

    generatePriceResponse(categoryKey) {
        return `该服务的费用详情请联系我们以获取更多信息。`;
    }
}

module.exports = new ServiceService();