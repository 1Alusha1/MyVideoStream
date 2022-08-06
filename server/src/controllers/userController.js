const User = require('../models/User');
const Video = require('../models/Video');
const jwt = require('jsonwebtoken');
const fs = require('fs');
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

  async uploadVideo(req, res) {
    const { id, name, description } = req.body;
    const { videofile, preview } = req.files;
    try {
      fs.mkdirSync(`./uploads/${id}`, (err) => {
        if (err) console.log(err);
      });
    } catch (err) {
      console.log('Папка уже создана');
    }
    try {
      fs.mkdirSync(`./uploads/${id}/${name}`, (err) => {
        if (err) console.log(err);
      });
    } catch (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Видео с таким названием уже существуте' });
      }
    }

    const videoPath = `./uploads/${id}/${name}/${videofile.name}`;
    const previewPath = `./uploads/${id}/${name}/${preview.name}`;

    videofile.mv(videoPath, (err) => {
      if (err) console.log(err);
    });
    preview.mv(previewPath, (err) => {
      if (err) console.log(err);
    });

    const video = await new Video({
      authroId: id,
      videoPath,
      previewPath,
      name,
      description,
      dateCreate: Date.now(),
    });

    await video.save((err, video) => {
      if (err) throw err;
      User.findOneAndUpdate(
        { _id: id },
        { $push: { userVideo: video._id } },
        (err) => {
          if (err) throw err;
        }
      );
    });

    res.status(200).json({ message: 'Видео успешно загружено!' });
  }
}

module.exports = new UserController();
