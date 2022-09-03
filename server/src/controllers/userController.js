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
    try {
      const { id, name, description, username } = req.body;
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

      const videoDBPath = `${id}/${name}/${videofile.name}`;
      const previewDBPath = `${id}/${name}/${preview.name}`;
      videofile.mv(videoPath, (err) => {
        if (err) console.log(err);
      });
      preview.mv(previewPath, (err) => {
        if (err) console.log(err);
      });

      const video = await new Video({
        authroId: id,
        videoPath: videoDBPath,
        previewPath: previewDBPath,
        name,
        username,
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
    } catch (err) {
      console.log(err);
    }
  }

  async getUserVideos(req, res) {
    try {
      const { id } = req.body;
      Video.find({ authroId: id }, (err, video) => {
        if (err) console.log(err);
        res.status(200).json(video);
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: 'Видео не найдены' });
    }
  }

  async getUserVideo(req, res) {
    try {
      const { id } = req.body;
      Video.find({ _id: id }, (err, video) => {
        if (err) console.log(err);
        res.status(200).json(video);
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: 'Видео не найдены' });
    }
  }

  getVideoPreview(req, res) {
    res.sendFile(
      `D:/js/MyVideoStream/server/uploads/${req.params.id}/${req.params.videoName}/${req.params.file}`
    );
  }
  getVideoFile(req, res) {
    const path = `uploads/${req.params.id}/${req.params.videoName}/${req.params.file}`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  }
  async getUserSubscriptions(req, res) {
    try {
      const { id } = req.query;
      User.findOne({ _id: id }, (err, user) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.status(200).json(user.userSubscriptions);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async getUserSubscriptionsVideo(req, res) {
    try {
      const { arrayId } = await req.body;
      const userVideo = [];
      Video.find((err, videos) => {
        if (err) throw err;
        for (let i = 0; i < arrayId.length; i++) {
          videos.filter((video) =>
            video.authroId === arrayId[i] ? userVideo.push(video) : false
          );
        }
        res.status(200).json(userVideo);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async setAboutText(req, res) {
    try {
      const { aboutText, id } = req.body;

      User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            'about.text': aboutText,
          },
        },
        { new: true },
        (err) => {
          if (err) console.log(err);
          res.status(200).json({ message: 'Информация о канале обновлена' });
        }
      );
    } catch (err) {
      if (err) console.log(err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async setAboutLink(req, res) {
    try {
      const { link, id } = req.body;
      User.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            'about.link': link,
          },
        },
        { new: true },
        (err) => {
          if (err) console.log(err);
          res.status(200).json({ message: 'Информация о канале обновлена' });
        }
      );
    } catch (err) {
      if (err) console.log(err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getAboutInfo(req, res) {
    try {
      User.findOne({ _id: req.params.id }, (err, data) => {
        if (err) console.log(err);
        data !== null
          ? res.status(200).json(data.about)
          : res.status(200).json([]);
      });
    } catch (err) {
      if (err) console.log(err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async getAllVideo(req, res) {
    try {
      Video.find((err, videos) => {
        if (err) console.log(err);
        videos.length ? res.status(200).json(videos) : res.status(200).json([]);
      });
    } catch (err) {
      if (err) console.log(err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async search(req, res) {
    try {
      const { videoName } = req.body;

      Video.findOne({ name: videoName }, (err, data) => {
        if (err) console.log(err);
        data !== null
          ? res.status(200).json(data)
          : res.status(404).json({ message: 'Видео не найдено' });
      });
    } catch (err) {
      if (err) console.log(err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async getCountFollowers(req, res) {
    try {
      const { id } = req.body;

      User.findOne({ _id: id }, (err, data) => {
        if (err) console.log(err);
        console.log(data);
        res
          .status(200)
          .json({ count: data.usersFollowers.length, username: data.username });
      });
    } catch (err) {
      if (err) console.log(err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new UserController();
