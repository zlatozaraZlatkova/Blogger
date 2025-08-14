const cors = require("cors");

const corsWhitelists = {
  development: [
    "http://localhost:3000",
    "http://localhost:4200", 
    "http://localhost:5000"
  ],
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
  maxAge: 36000, // 1 h in production
  optionsSuccessStatus: 200,
  origin: function (origin, callback) {

    if (!origin) {
      return callback(null, true);
    }


    if (origin === 'https://blogger-app-a86fa2d19e9c.herokuapp.com') {
      return callback(null, true);
    }

  
    if (environment === "development") {
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }
    }

    if (environment === "production" && whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    const allowedLocalhost = [
      'http://localhost:3000',
      'http://localhost:4200', 
      'http://localhost:5000'
    ];
    
    if (allowedLocalhost.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  }
});

module.exports = corsMiddleware;