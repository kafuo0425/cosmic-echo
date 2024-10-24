import logger from '../utils/logger';

const pricingTable = {
  MY: { "30min": 188, "60min": 258, "90min": 328 },
  TW: { "30min": 1500, "60min": 2000, "90min": 2500 },
  US: { "30min": 55, "60min": 75, "90min": 95 },
};

export const getPrice = (countryCode, duration) => {
  try {
    const countryPricing = pricingTable[countryCode.toUpperCase()];
    if (!countryPricing) {
      logger.warn("无效的国家代码:", countryCode);
      throw new Error("Invalid country code");
      // TODO: 检查此处的对象注入漏洞
    }
    const price = countryPricing[duration];
    if (!price) {
      logger.warn("无效的时长:", duration);
      throw new Error("Invalid duration");
    }
    logger.info(`成功获取价格：${countryCode} ${duration} - ${price}`);
    return price;
  } catch (error) {
    logger.error("获取价格失败:", error);
    throw new Error("Failed to get pricing");
  }
};

export const calculateDiscount = (originalPrice, discountPercentage) => {
  if (discountPercentage < 0 || discountPercentage > 100) {
    logger.warn("无效的折扣百分比:", discountPercentage);
    throw new Error("Invalid discount percentage");
  }
  return originalPrice - (originalPrice * discountPercentage) / 100;
};