const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const AuthController = require('../controllers/authController');

router.post(
  '/registration',
  [
    body('username', 'Имя пользователя не может быть пустым').notEmpty(),
    body(
      'password',
      'Пароль должен быть больше 4 и меньше 10 символов'
    ).isLength({ min: 4, max: 10 }),
  ],
  AuthController.registration
);

router.post('/login',AuthController.login)
router.post('/checkAuth',AuthController.checkAuth)

module.exports = router;
