/* eslint-disable no-console */
// services/appointmentService.js

const servicesConfig = require("../config/services.json");

class AppointmentService {
  getServiceDetails(serviceKey) {
    try {
      if (!Object.prototype.hasOwnProperty.call(servicesConfig, serviceKey)) {
        throw new Error(`未找到服务：${serviceKey}`);
        // TODO: 检查此处的对象注入漏洞
      }
      const service = servicesConfig[serviceKey];
      return {
        name: service.name,
        description: service.description,
        services: service.services
          .map((s) => `${s.name}: ${s.description}`)
          .join("\n"),
        pricing: service.pricing,
        booking_policy: service.booking_policy,
        additional_fees: service.additional_fees,
        booking_link: service.booking_link,
      };
    } catch (error) {
      console.error("获取服务详情时出错:", error);
      return "服务获取失败，请稍后重试。";
    }
  }

  generateServiceResponse(serviceKey, userQuery) {
    const serviceDetails = this.getServiceDetails(serviceKey);
    if (typeof serviceDetails === "string") {
      return serviceDetails;
    }
    if (userQuery.includes("费用") || userQuery.includes("价格")) {
      return this.generatePricingResponse(serviceDetails);
    }
    return `
        您正在了解我们的${serviceDetails.name}。\n
        服务描述：${serviceDetails.description}\n
        提供的服务项目：\n${serviceDetails.services}\n
        💵 服务费用：\n- 30分钟：RM ${serviceDetails.pricing["30_min"].my}（马来西亚），NTD ${serviceDetails.pricing["30_min"].tw}（台湾），USD ${serviceDetails.pricing["30_min"].intl}（国际）\n
        💵 60分钟：RM ${serviceDetails.pricing["60_min"].my}，NTD ${serviceDetails.pricing["60_min"].tw}，USD ${serviceDetails.pricing["60_min"].intl}\n
        💵 90分钟：RM ${serviceDetails.pricing["90_min"].my}，NTD ${serviceDetails.pricing["90_min"].tw}，USD ${serviceDetails.pricing["90_min"].intl}\n
        📝 预约链接：${serviceDetails.booking_link}\n
        预约政策：${serviceDetails.booking_policy.advance_booking} ${serviceDetails.booking_policy.rescheduling} ${serviceDetails.booking_policy.refund_policy}
        `;
  }

  generatePricingResponse(serviceDetails) {
    return `
        服务费用为：\n
        - 30分钟：RM ${serviceDetails.pricing["30_min"].my}（马来西亚），NTD ${serviceDetails.pricing["30_min"].tw}（台湾），USD ${serviceDetails.pricing["30_min"].intl}（国际）\n
        - 60分钟：RM ${serviceDetails.pricing["60_min"].my}，NTD ${serviceDetails.pricing["60_min"].tw}，USD ${serviceDetails.pricing["60_min"].intl}\n
        - 90分钟：RM ${serviceDetails.pricing["90_min"].my}，NTD ${serviceDetails.pricing["90_min"].tw}，USD ${serviceDetails.pricing["90_min"].intl}\n
        `;
  }
}

module.exports = AppointmentService;
