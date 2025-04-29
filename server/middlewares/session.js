const { verifyToken } = require("../services/authService");

module.exports = () => (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const payload = verifyToken(token);

      req.user = payload;

    } catch (err) {
      res.clearCookie('jwt');
    }
  }

  next();
};