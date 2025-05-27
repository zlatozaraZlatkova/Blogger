const router = require("express").Router();


router.get("/", (req, res) => {
  res.status(200).json({ 
    clientId: process.env.GOOGLE_CLIENT_ID,
    apiKey: process.env.GOOGLE_API_KEY,
    discoveryDoc: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
    scopes: 'https://www.googleapis.com/auth/drive.file',
   });
});

module.exports = router;
