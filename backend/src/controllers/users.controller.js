const User = require('../models/User');

// GET /api/users (superuser only) - list users
exports.listUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

// PATCH /api/users/:id/role - toggle role
exports.toggleRole = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.equals(id)) return res.status(400).json({ message: "Cannot change your own role" });

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.role = user.role === 'superuser' ? 'normal' : 'superuser';
  await user.save();
  res.json({ id: user._id, role: user.role });
};

// PATCH /api/users/me - update profile (name, avatarUrl)
exports.updateProfile = async (req, res) => {
  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.file) {
    updates.avatarUrl = `/uploads/${req.file.filename}`;
  } else if (req.body.avatarUrl) {
    updates.avatarUrl = req.body.avatarUrl;
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
  res.json(user);
};
