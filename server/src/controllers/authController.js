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
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибка при регистрации', errors });
      }

      const { username, password } = req.body;

      const candidate = await User.findOne({ username });
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

      User.findOneAndUpdate({ username }, { token: token }, { new: true },()=>{});

      return res.json(token);
    } catch (err) {
      console.log(err);
      res.json({ message: 'Ошибка авторизации' });
    }
  }
  async checkAuth(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(404).json({ message: 'Токен не найден' });
      }
      const decodeData = jwt.verify(token, 'secret');
      req.user = decodeData;

      User.findOne({ username: decodeData.username }, (err, user) => {
        if (user) {
          if (user.token === token) {
            return res.status(200).json({ isAuth: true });
          } else {
            return res.status(200).json({ isAuth: false });
          }
        } else {
          return res.status(200).json({ isAuth: false });
        }
      });
    } catch (e) {
      console.log(e);
      res.json({ auth: false });
    }
  }
}

module.exports = new AuthController();
