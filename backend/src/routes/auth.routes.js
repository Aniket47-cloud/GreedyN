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

    // bundle token + role
    const payload = {
      token,
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        lastLogin: req.user.lastLogin,
        createdAt: req.user.createdAt,
        avatarUrl: req.user.avatarUrl,
      },

    };

    // encode to Base64 so URL is shorter/cleaner
    const encoded = Buffer.from(JSON.stringify(payload)).toString("base64");

    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?data=${encoded}`);
  }
);



module.exports = router;
