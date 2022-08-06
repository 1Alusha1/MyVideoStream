const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/getUserByToken', UserController.getUserByToken);
router.post('/uploadVideo', UserController.uploadVideo);

module.exports = router;
