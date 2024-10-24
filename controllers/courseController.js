import express from 'express';
const router = express.Router();
import courseService from '../services/courseService';
import logger from '../utils/logger';
import Joi from 'joi';
import xss from 'xss';

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

export default router;