const Todo = require('../models/Todo');
const { body, validationResult } = require('express-validator');

exports.createValidators = [
  body('title').isLength({ min: 1 }).trim(),
  body('scheduledAt').isISO8601().toDate()
];

exports.createTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description, scheduledAt } = req.body;
  if (new Date(scheduledAt) <= new Date()) return res.status(400).json({ message: 'scheduledAt must be in the future' });

  const todo = new Todo({ user: req.user._id, title, description, scheduledAt });
  await todo.save();
  res.status(201).json(todo);
};

exports.listTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ scheduledAt: 1 });
  res.json(todos);
};

exports.getTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: 'Not found' });
  res.json(todo);
};

exports.updateValidators = [
  body('title').optional().isLength({ min: 1 }).trim(),
  body('scheduledAt').optional().isISO8601().toDate()
];

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: 'Not found' });

  if (req.body.scheduledAt && new Date(req.body.scheduledAt) <= new Date())
    return res.status(400).json({ message: 'scheduledAt must be in the future' });

  Object.assign(todo, req.body);
  await todo.save();
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};

// Notifications: upcoming todos due in next 4 hours & completed todos
exports.notifications = async (req, res) => {
  const now = new Date();
  const fourHoursLater = new Date(now.getTime() + 4 * 60 * 60 * 1000);

  const upcoming = await Todo.find({
    user: req.user._id,
    completed: false,
    scheduledAt: { $gte: now, $lte: fourHoursLater }
  }).sort({ scheduledAt: 1 });

  const completed = await Todo.find({
    user: req.user._id,
    completed: true
  }).sort({ updatedAt: -1 }).limit(20);

  res.json({ upcoming, completed });
};
