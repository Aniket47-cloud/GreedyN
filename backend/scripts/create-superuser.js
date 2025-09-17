require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const email = process.argv[2];
  const password = process.argv[3];
  if (!email || !password) {
    console.error('Usage: npm run create-superuser -- <email> <password>');
    process.exit(1);
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      user.role = 'superuser';
      if (password) user.password = await bcrypt.hash(password, 12);
      await user.save();
      console.log('Updated existing user to superuser');
    } else {
      const hashed = await bcrypt.hash(password, 12);
      user = new User({ email, password: hashed, role: 'superuser', provider: 'local' });
      await user.save();
      console.log('Created new superuser');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
