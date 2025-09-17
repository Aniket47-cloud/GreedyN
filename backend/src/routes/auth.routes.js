const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const passport = require('passport');
const jwt = require('jsonwebtoken');
router.post('/register', authCtrl.registerValidators, authCtrl.register);
router.post('/login', authCtrl.loginValidators, authCtrl.login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    // Set token in an HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true if HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 👇 Role-based redirect
    if (req.user.role === "normal") {
      res.redirect(process.env.FRONTEND_URL + "/dashboard/user");
    }  else {
      res.redirect(process.env.FRONTEND_URL + "/dashboard/superuser");
    }
  }
);


module.exports = router;
