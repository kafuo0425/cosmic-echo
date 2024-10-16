// services/courseService.js

const coursesConfig = require('../config/courses.json');

class CourseService {
    async getCourseDetails(courseKey) {
        try {
            const course = coursesConfig[courseKey];
            if (!course) {
                throw new Error(`未找到课程：${courseKey}`);
            }

            return {
                name: course.name,
                schedule: course.schedule,
                welcome_message: course.welcome_message,
                details: course.details.join("\n"),
                target_audience: course.target_audience.join("\n"),
                course_content: course.course_content.join("\n"),
                highlights: course.highlights.join("\n"),
                pricing: course.pricing,
                registration: course.registration
            };
        } catch (error) {
            console.error("获取课程详情时出错:", error);
            return `课程获取失败，请稍后重试。`;
        }
    }

    generateCourseResponse(courseKey, userQuery) {
        const courseDetails = this.getCourseDetails(courseKey);
        if (typeof courseDetails === 'string') {
            return courseDetails;
        }

        if (userQuery.includes("费用") || userQuery.includes("价格")) {
            return this.generatePriceResponse(courseDetails);
        }

        return `
        欢迎了解我们的${courseDetails.name}。\n
        🗓️ 课程时间：${courseDetails.schedule.dates}，${courseDetails.schedule.time}\n
        🌍 地点：${courseDetails.schedule.location}\n
        🔗 ZOOM链接：${courseDetails.schedule.zoom_link}\n
        🎉 欢迎辞：${courseDetails.welcome_message}\n
        📋 活动详情：${courseDetails.details}\n
        🎯 适合人群：${courseDetails.target_audience}\n
        📚 课程内容：${courseDetails.course_content}\n
        🌟 课程亮点：${courseDetails.highlights}\n
        💵 课程费用：\n- 常规费用：RM ${courseDetails.pricing.regular}\n- 提前报名：RM ${courseDetails.pricing.early_bird}\n- 组合优惠：RM ${courseDetails.pricing.group_discount}/人（两人或以上）\n- 复训价格：RM ${courseDetails.pricing.retake_price}\n
        📅 优惠截止日期：${courseDetails.pricing.discount_deadline}\n
        📝 报名链接：${courseDetails.registration.link}\n
        💳 支付说明：${courseDetails.registration.instructions}
        `;
    }

    generatePriceResponse(courseDetails) {
        return `
        课程费用为：\n
        💵 常规费用：RM ${courseDetails.pricing.regular}\n
        💵 提前报名：RM ${courseDetails.pricing.early_bird}\n
        💵 组合优惠：RM ${courseDetails.pricing.group_discount}/人（两人或以上）\n
        💵 复训价格：RM ${courseDetails.pricing.retake_price}\n
        📅 提前报名优惠截止日期为：${courseDetails.pricing.discount_deadline}。\n
        请通过以下链接报名并完成支付：${courseDetails.registration.link}
        `;
    }
}

module.exports = new CourseService();