module.exports = function checkAuth(shouldBeAuthenticated) {
  return function (req, res, next) {
    const isNotAuthWhenAuthIsRequired = shouldBeAuthenticated && !req.user;
    console.log("User authenticated:", !!req.user);
    console.log("Authentication required:", shouldBeAuthenticated);
    console.log("Auth check passed:", !(shouldBeAuthenticated && !req.user));
    
    if (isNotAuthWhenAuthIsRequired) {
      return res.status(401).json({ message: "Invalid authorization token" });
    }
    
    next();
  };
};