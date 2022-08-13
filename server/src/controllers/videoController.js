const Video = require('../models/Video');
const User = require('../models/User');
const chekUserLikeOrDislike = require('../use/chekUserLikeOrDislike');
class VideoController {
  async like(req, res) {
    try {
      const { id, userId } = req.body;
      chekUserLikeOrDislike(userId, id).then((data) => {
        if (data) {
          Video.findOneAndUpdate({ _id: id }, { $inc: { like: -1 } }, (err) => {
            if (err) throw err;
          });
          User.findOneAndUpdate(
            { _id: userId },
            { $pull: { userLike: { video: id } } },
            { new: true },
            (err) => {
              if (err) throw err;
            }
          );
          return res.status(200).json({ message: 'Лайк убран' });
        } else {
          Video.findOneAndUpdate({ _id: id }, { $inc: { like: 1 } }, (err) => {
            if (err) throw err;
          });
          User.findOneAndUpdate(
            { _id: userId },
            { $push: { userLike: { video: id } } },
            { new: true },
            (err) => {
              if (err) throw err;
            }
          );
          return res.status(200).json({ message: 'Лайк Поставлен' });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async disLike(req, res) {
    try {
      const { id, userId } = req.body;
      chekUserLikeOrDislike(userId, id, false).then((data) => {
        if (data) {
          Video.findOneAndUpdate(
            { _id: id },
            { $inc: { dislike: -1 } },
            (err) => {
              if (err) throw err;
            }
          );
          User.findOneAndUpdate(
            { _id: userId },
            { $pull: { userDisLike: { video: id } } },
            { new: true },
            (err) => {
              if (err) throw err;
            }
          );
          return res.status(200).json({ message: 'Дизлайк убран' });
        } else {
          Video.findOneAndUpdate(
            { _id: id },
            { $inc: { dislike: 1 } },
            (err) => {
              if (err) throw err;
            }
          );
          User.findOneAndUpdate(
            { _id: userId },
            { $push: { userDisLike: { video: id } } },
            { new: true },
            (err) => {
              if (err) throw err;
            }
          );
          return res.status(200).json({ message: 'Дизлайк Поставлен' });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async subscribe(req, res) {
    try {
      const { userId, authorId, authorname, username } = req.body;
      let flag;
      User.findOne({ _id: userId }, (err, user) => {
        console.log(user)
        if (user.userSubscriptions.length) {
          flag = user.userSubscriptions.filter((item) =>
            item.authorId == authorId ? item : false
          );
        }
        console.log(flag)
        if (flag) {
          User.findOneAndUpdate(
            { _id: authorId },
            { $pull: { usersFollowers: { userId, username } } },
            { new: true },
            (err) => {
              if (err) throw err;
            }
          );
          User.findOneAndUpdate(
            { _id: userId },
            {
              $pull: {
                userSubscriptions: { authorId, authorname },
              },
            },
            { new: true },
            (err) => {
              if (err) throw err;
            }
          );
          res.status(200).json({ message: 'Вы отписались' });
        } else {
          User.findOneAndUpdate(
            { _id: authorId },
            {
              $push: {
                usersFollowers: { userId, username },
              },
            },
            { new: true },
            (err) => {
              if (err) throw err;
            }
          );
          User.findOneAndUpdate(
            { _id: userId },
            {
              $push: {
                userSubscriptions: { authorId, authorname },
              },
            },
            { new: true },
            (err) => {
              if (err) throw err;
            }
          );
          res.status(200).json({ message: 'Вы подписались' });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async comment(req, res) {
    try {
      const { userId, videoId, text, dateCreate, username } = req.body;

      Video.findOneAndUpdate(
        { _id: videoId },
        {
          $push: { comments: { userId, text, dateCreate, username } },
        },
        { new: true },
        (err) => {}
      );
      res.status(200).json({ message: 'Коментарий добавлен' });
    } catch (err) {
      if (err) console.log(err);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async getComment(req, res) {
    try {
      const { id } = req.body;
      Video.findOne({ _id: id }, (err, video) => {
        if (err) console.log(err);
        res.status(200).json(video.comments);
      });
    } catch (err) {
      if (err) console.log(err);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async view(req, res) {
    try {
      const { id } = req.query;

      Video.findOneAndUpdate(
        { _id: id },
        {
          $inc: { views: 1 },
        },
        (err) => {
          if (err) console.log(err);
        }
      );
    } catch (err) {
      if (err) throw err;
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new VideoController();
