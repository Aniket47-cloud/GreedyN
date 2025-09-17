const Todo = require('../models/Todo');
const { body, validationResult } = require('express-validator');

// Validation rules for creating a todo
exports.createValidators = [
  body('title').isLength({ min: 1 }).trim(),
  body('dueDate').isISO8601().toDate()  
];

// Create a todo
exports.createTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { title, description, dueDate, status } = req.body;

  if (new Date(dueDate) <= new Date())
    return res.status(400).json({ message: 'dueDate must be in the future' });

  try {
    const todo = new Todo({
      user: req.user._id,
      title,
      description,
      dueDate,
      status: status || "Upcoming" // 👈 default
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// List all todos for the user
exports.listTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ dueDate: 1 });
  res.json(todos);
};

// Get single todo
exports.getTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: 'Not found' });
  res.json(todo);
};

// Validation rules for updating a todo
exports.updateValidators = [
  body('title').optional().isLength({ min: 1 }).trim(),
  body('dueDate').optional().isISO8601().toDate()
];

// Update a todo
exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: 'Not found' });

  if (req.body.dueDate && new Date(req.body.dueDate) <= new Date())
    return res.status(400).json({ message: 'dueDate must be in the future' });

  Object.assign(todo, req.body);
  await todo.save();
  res.json(todo);
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};

// Notifications: upcoming todos due in next 4 hours & recently completed todos
exports.notifications = async (req, res) => {
  const now = new Date();
  const fourHoursLater = new Date(now.getTime() + 4 * 60 * 60 * 1000);

  // Upcoming (status = "Upcoming", due in next 4 hours)
  const upcoming = await Todo.find({
    user: req.user._id,
    status: "Upcoming",
    dueDate: { $gte: now, $lte: fourHoursLater }
  }).sort({ dueDate: 1 });

  // Recently completed (status = "Completed")
  const completed = await Todo.find({
    user: req.user._id,
    status: "Completed"
  }).sort({ updatedAt: -1 }).limit(20);

  res.json({ upcoming, completed });
};
