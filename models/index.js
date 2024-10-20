const mongoose = require("mongoose");
const logger = require("../utils/logger").logger;

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB connection disconnected");
});

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected");
});

mongoose.connection.on("error", (err) => {
  logger.error("MongoDB connection error:", err);
});

const connectWithRetry = () => {
  return mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info("MongoDB connected successfully");
    })
    .catch((err) => {
      logger.error("MongoDB connection failed, retrying...", err);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

const User = require("./userModel");
const UserPreferences = require("./userPreferencesModel");

module.exports = { User, UserPreferences };