const express = require('express');
const router = express.Router();
const todosCtrl = require('../controllers/todos.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/', authenticate, todosCtrl.createValidators, todosCtrl.createTodo);
router.get('/', authenticate, todosCtrl.listTodos);
router.get('/notifications', authenticate, todosCtrl.notifications);
router.get('/:id', authenticate, todosCtrl.getTodo);
router.patch('/:id', authenticate, todosCtrl.updateValidators, todosCtrl.updateTodo);
router.delete('/:id', authenticate, todosCtrl.deleteTodo);

module.exports = router;
