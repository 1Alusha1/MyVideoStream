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
    console.log(stat);
    const range = req.headers.range;
    if (range) {
      console.log('we have range', range);
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      console.log(parts);
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
      console.log('no range', range);
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
          return  res.status(500).json(err);
        }
        res.status(200).json(user.userSubscriptions);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Ошибка сервера' });
    } 
  }
}

module.exports = new UserController();
