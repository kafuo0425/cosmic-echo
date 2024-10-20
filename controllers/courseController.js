const express = require("express");
const router = express.Router();
const courseService = require("../services/courseService");
const logger = require("../utils/logger");
const Joi = require("joi");
const xss = require("xss");

const courseIdSchema = Joi.string().alphanum().required();

router.get("/:courseId", async (req, res) => {
  try {
    const { error } = courseIdSchema.validate(req.params.courseId);
    if (error) {
      return res.status(400).send({ error: "Invalid course ID format" });
    }

    const courseId = req.params.courseId;
    const courseDetails = await courseService.getCourseDetails(courseId);

    if (courseDetails) {
      const safeCourseDetails = {
        ...courseDetails,
        title: xss(courseDetails.title),
        description: xss(courseDetails.description),
      };

      res.status(200).send(safeCourseDetails);
    } else {
      res.status(404).send({ error: "Course not found" });
    }
  } catch (error) {
    logger.error("Error retrieving course details:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;