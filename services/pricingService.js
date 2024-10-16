// services/pricingService.js

const logger = require('../utils/logger');

const pricingTable = {
    'MY': { '30min': 188, '60min': 258, '90min': 328 },
    'TW': { '30min': 1500, '60min': 2000, '90min': 2500 },
    'US': { '30min': 55, '60min': 75, '90min': 95 }
};

exports.getPrice = (countryCode, duration) => {
    try {
        const countryPricing = pricingTable[countryCode.toUpperCase()];
        if (!countryPricing) {
            logger.warn('无效的国家代码:', countryCode);
            throw new Error('Invalid country code');
        }
        
        const price = countryPricing[duration];
        if (!price) {
            logger.warn('无效的时长:', duration);
            throw new Error('Invalid duration');
        }

        logger.info(`成功获取价格：${countryCode} ${duration} - ${price}`);
        return price;
    } catch (error) {
        logger.error('获取价格失败:', error);
        throw new Error('Failed to get pricing');
    }
};

exports.calculateDiscount = (originalPrice, discountPercentage) => {
    if (discountPercentage < 0 || discountPercentage > 100) {
        logger.warn('无效的折扣百分比:', discountPercentage);
        throw new Error('Invalid discount percentage');
    }
    
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = originalPrice - discountAmount;

    logger.info(`折扣后的价格：${finalPrice}`);
    return finalPrice;
};