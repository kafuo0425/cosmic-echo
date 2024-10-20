const coursesConfig = require("../config/courses.json");

class CourseService {
  async getCourseDetails(courseKey) {
    // TODO: 检查此处的对象注入漏洞
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
        registration: course.registration,
      };
    } catch (error) {
      console.error("获取课程详情时出错:", error);
      return "课程获取失败，请稍后重试。";
    }
  }

  generateCourseResponse(courseKey, userQuery) {
    const courseDetails = this.getCourseDetails(courseKey);
    if (typeof courseDetails === "string") {
      return courseDetails;
    }
    if (userQuery.includes("费用") || userQuery.includes("价格")) {
      return this.generatePricingResponse(courseDetails);
    }
    return `
        您正在了解我们的${courseDetails.name}课程。\n
        课程详情：${courseDetails.details}\n
        适合对象：${courseDetails.target_audience}\n
        课程内容：${courseDetails.course_content}\n
        费用：${courseDetails.pricing}\n
        报名链接：${courseDetails.registration}
        `;
  }
}

module.exports = CourseService;