const Video = require('../models/Video');
const User = require('../models/User');
const checkReaction = require('../use/checkReaction');
const like = require('../use/like');
const dislike = require('../use/dislike');

class VideoController {
  async userReaction(req, res) {
    try {
      const { videoId, userId, opinion } = req.body;
      checkReaction(userId, videoId, opinion).then((data) => {
        if (opinion) {
          if (data.like) {
            like.setLike(userId, videoId, () => {
              res.status(200).json({ message: 'лайк поставлен' });
            });
            data.dislike === false &&
              dislike.removeDislike(userId, videoId, () => {});
          } else {
            like.removeLike(userId, videoId, () => {
              res.status(200).json({ message: 'лайк убран' });
            });
          }
        } else {
          if (data.dislike) {
            dislike.setDislike(userId, videoId, () => {
              res.status(200).json({ message: 'дизлайк поставлен' });
            });
            data.like === false && like.removeLike(userId, videoId, () => {});
          } else {
            dislike.removeDislike(userId, videoId, () => {
              res.status(200).json({ message: 'дизлайк убран' });
            });
          }
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
      console.log(req.body);
      User.findOne({ _id: userId }, (err, user) => {
        if (user.userSubscriptions) {
          flag = user.userSubscriptions.filter((item) =>
            item.authorId == authorId ? item : false
          );
        }
        if (flag.length > 0) {
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
