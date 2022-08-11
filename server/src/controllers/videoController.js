const Video = require('../models/Video');
const User = require('../models/User');
const checkUserLine = require('../use/chekUserLike');

class VideoController {
  async like(req, res) {
    try {
      const { id, userId } = req.body;
      checkUserLine(userId, id).then((data) => {
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
    }
  }
  async chekUserLike(req, res) {
    try {
      const { userId, videoId } = req.body;
      checkUserLine(userId, videoId).then(data=>console.log(data[0]))
      res.json({ m: checkUserLine(userId, videoId) });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'server Error' });
    }
  }
}

// if (like.video === videoId) {
//   console.log(like.video);
//   console.log(1)
//   return res
//     .status(200)
//     .json({ message: 'Лайк поставлен', liked: true });
// } else {
//   console.log(0)
//   return res
//     .status(200)
//     .json({ message: 'Лайк не поставлен', liked: false });
// }

module.exports = new VideoController();
