const User = require('../models/User');
const jwt = require('jsonwebtoken');
class UserController {
  async getUserByToken(req, res) {
    try {
      const { token } = req.body;

      const user = await User.findOne({ token });

      if (user.token !== token) {
        return res.status(500).json({ message: 'Токен не соответствует' });
      }

      const decodeData = jwt.verify(user.token, 'secret');

      res.status(200).json(decodeData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new UserController();
