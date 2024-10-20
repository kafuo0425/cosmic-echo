const appointmentService = require("../services/appointmentService");
const logger = require("../utils/logger");

exports.getServiceInfo = (req, res) => {
  try {
    const serviceKey = req.params.serviceKey;
    const userQuery = req.query.q || "";
    const serviceResponse = appointmentService.generateServiceResponse(
      serviceKey,
      userQuery,
    );
    res.status(200).json({ message: serviceResponse });
  } catch (error) {
    logger.error("Error retrieving service information:", error);
    res.status(500).json({ error: "Failed to retrieve service information" });
  }
};