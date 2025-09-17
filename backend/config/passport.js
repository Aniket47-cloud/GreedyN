const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../src/models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    if (!email) return done(new Error('No email from Google'));

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        name: profile.displayName || '',
        avatarUrl: profile.photos && profile.photos[0] && profile.photos[0].value,
        provider: 'google',
        role: 'normal'
      });
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

module.exports = passport;
