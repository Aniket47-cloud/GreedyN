const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const signToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

exports.registerValidators = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').optional().isLength({ min: 1 })
];

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, name } = req.body;
  try {
    if (await User.findOne({ email })) return res.status(409).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashed, name, provider: 'local' });
    await user.save();
    const token = signToken(user);
    res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginValidators = [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
];

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user);
    res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
