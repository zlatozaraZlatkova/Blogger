const cors = require("cors");

const corsWhitelists = {
  development: ["http://localhost:5000", "http://localhost:4200"],
  production: [
    "https://blogger-app-a86fa2d19e9c.herokuapp.com"
  ]
};

const environment = process.env.NODE_ENV || "development";
const whitelist = corsWhitelists[environment] || corsWhitelists.development;


const corsMiddleware = cors({
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "Accept",
    "X-Requested-With",
  ],
  exposedHeaders: ["Set-Cookie"],
  maxAge: 36000, // 1 hour in seconds
  origin: function (origin, callback) {

    if (environment === "development") {

      if (!origin || whitelist.indexOf(origin) !== -1) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'), false);
    }


    if (!origin) {
      return callback(null, true);
    }
    
    if (whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'), false);
  }
});

module.exports = corsMiddleware;