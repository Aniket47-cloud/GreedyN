const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');
const { authenticate, requireRole } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.get('/', authenticate, requireRole('superuser'), usersCtrl.listUsers);
router.patch('/:id/role', authenticate, requireRole('superuser'), usersCtrl.toggleRole);

router.put('/me', authenticate, upload.single('avatar'), usersCtrl.updateProfile);

module.exports = router;
