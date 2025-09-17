const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('./src/middleware/rateLimit');
const passport = require('./config/passport'); // registers strategy
const authRoutes = require('./src/routes/auth.routes');
const usersRoutes = require('./src/routes/users.routes');
const todosRoutes = require('./src/routes/todos.routes');
const path = require('path');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(rateLimit);
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// init passport
app.use(passport.initialize());

// static for uploaded avatars
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/todos', todosRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = app;
