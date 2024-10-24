import serviceService from '../services/serviceService';
import logger from '../utils/logger';

export const getServiceInfo = (req, res) => {
  try {
    const categoryKey = req.params.categoryKey;
    const userQuery = req.query.q || "";
    const serviceResponse = serviceService.generateServiceResponse(
      categoryKey,
      userQuery,
    );
    res.status(200).json({ message: serviceResponse });
  } catch (error) {
    logger.error("Error retrieving service information:", error);
    res.status(500).json({ error: "Failed to retrieve service information" });
  }
};