const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW_MIN || '15', 10) ) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  standardHeaders: true,
  legacyHeaders: false
});
