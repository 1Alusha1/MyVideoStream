const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/getUserByToken', UserController.getUserByToken);

module.exports = router;
