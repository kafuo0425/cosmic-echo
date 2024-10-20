/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const csrf = require("csrf");
const rateLimit = require("express-rate-limit");
const Sentry = require("@sentry/node");
const loggerMiddleware = require("./utils/logger");
const errorHandler = require("./utils/errorHandler");
const apiRoutes = require("./routes/api");
const csrfProtection = new csrf();

Sentry.init({ dsn: process.env.SENTRY_DSN, environment: process.env.NODE_ENV });

const app = express();

app.use(Sentry.Handlers.requestHandler());

app.use(helmet());
app.use(compression());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
  headers: true,
});
app.use(limiter);

app.use(loggerMiddleware);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "https://your-production-domain.com",
    credentials: true,
  }),
);

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const {
  setLanguage,
  parseAcceptLanguage,
} = require("./services/languageService");
app.use((req, res, next) => {
  const lang = parseAcceptLanguage(req.headers["accept-language"]) || "zh";
  if (lang) {
    setLanguage(lang);
  }
  next();
});

app.use((req, res, next) => {
  const excludedRoutes = [
    "/api/facebook",
    "/api/personalization",
    "/api/whatsapp",
  ];

  if (excludedRoutes.some((route) => req.path.startsWith(route))) {
    return next();
  }

  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    const secret = csrfProtection.secretSync();
    res.cookie("csrfSecret", secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.locals.csrfToken = csrfProtection.create(secret);
    res.setHeader("X-CSRF-Token", res.locals.csrfToken);
    return next();
  }

  const secret = req.cookies.csrfSecret;
  const token = req.body._csrf || req.headers["x-csrf-token"];

  try {
    if (secret && token && csrfProtection.verify(secret, token)) {
      return next();
    }
    throw new Error("Invalid CSRF token");
  } catch (err) {
    loggerMiddleware.logger.error("CSRF verification failed", err);
    return res.status(403).json({ message: "Invalid CSRF token" });
  }
});

const connectWithRetry = async () => {
  while (true) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      loggerMiddleware.logger.info("MongoDB connected successfully");
      break;
    } catch (err) {
      loggerMiddleware.logger.error("MongoDB connection error:", err);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};
connectWithRetry();

app.use("/api", apiRoutes);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

module.exports = app;