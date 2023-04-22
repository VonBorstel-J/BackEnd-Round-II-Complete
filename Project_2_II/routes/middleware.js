exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    res.redirect("/login");
  };
  