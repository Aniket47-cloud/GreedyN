const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String },
  name: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  role: { type: String, enum: ['normal', 'superuser'], default: 'normal' },
  provider: { type: String, enum: ['local', 'google'], default: 'local' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
