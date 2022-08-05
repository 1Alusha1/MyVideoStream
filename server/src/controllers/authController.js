const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const generateAccessToken = (id, username) => {
  const payload = {
    id,
    username,
  };
  return jwt.sign(payload, 'secret', { expiresIn: '24h' });
};

class AuthController {
  async registration(req, res) {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res
          .staus(400)
          .json({ message: 'Ошибка при регистрации', errors });
      }

      const { username, password } = req.body;

      const candidate = await User.findOne({ username });
      console.log(candidate);
      if (candidate) {
        return res.json({ message: 'Пользователь уже зарегестрирован' });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ username, password: hashPassword });
      await user.save();

      return res
        .status(200)
        .json({ message: 'Пользователь успешно зарегестрирован' });
    } catch (err) {
      console.log(err);
      res.json({ message: 'Ошибка регестрации' });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Введен не верный пароль' });
      }

      const token = generateAccessToken(user._id, username);

      User.findOneAndUpdate({ username }, { token: token }, { new: true });

      return res.json(token);
    } catch (err) {
      console.log(err);
      res.json({ message: 'Ошибка авторизации' });
    }
  }
}

module.exports = new AuthController();
