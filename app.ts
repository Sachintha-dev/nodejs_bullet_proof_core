import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./src/middleware/errorHandler.middleware";
import NotFoundHandler from "./src/utils/notFoundError.handler"; // Import the not found handler
import config from "./config";
import router from "./src/api";

var cookies = require("cookie-parser");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const hpp = require("hpp");

const allowedMethods = ["GET", "HEAD", "POST", "PATCH"];

class App {
  express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  setMiddlewares(): void {
    this.express.enable("trust proxy");
    this.express.use(helmet());
    this.express.use(xssClean());
    this.express.use(hpp());
    this.express.use(cors());

    // Set custom headers for security
    this.express.use((req, res, next) => {
      res.setHeader("X-Frame-Options", "sameorigin");
      res.setHeader(
        "Content-Security-Policy-Report-Only",
        "default-src 'self'; frame-ancestors 'self'; script-src 'self'"
      );
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomain"
      );
      next();
    });

    // Configure session
    this.express.use(
      session({
        secret: process.env.COOKIE_SECRET || "default_secret",
        resave: true,
        saveUninitialized: true,
        cookie: {
          httpOnly: true,
          sameSite: "strict",
        },
      })
    );

    // Allow only specific HTTP methods
    this.express.use((req, res, next) => {
      if (!allowedMethods.includes(req.method)) {
        return res.status(405).send("Method Not Allowed");
      }
      next();
    });

    // Logging, parsing, and cookies
    this.express.use(morgan("dev"));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(cookies());
  }

  setRoutes(): void {
    // Register application routes
    this.express.use(config.api.prefix, router);
  }

  catchErrors(): void {
    // Handle resource not found
    this.express.use(NotFoundHandler.handle);

    // Global error handler
    this.express.use(errorHandler);
  }
}

export default new App().express;
