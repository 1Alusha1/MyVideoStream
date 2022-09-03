const Video = require('../models/Video');
const User = require('../models/User');

function setLike(userId, videoId, cb) {
  Video.findOneAndUpdate({ _id: videoId }, { $inc: { like: 1 } }, (err) => {
    if (err) throw err;
  });
  User.findOneAndUpdate(
    { _id: userId },
    { $push: { userLike: { video: videoId } } },
    { new: true },
    (err) => {
      if (err) throw err;
    }
  );
  cb();
}

function removeLike(userId, videoId, cb) {
  Video.findOneAndUpdate({ _id: videoId }, { $inc: { like: -1 } }, (err) => {
    if (err) throw err;
  });
  User.findOneAndUpdate(
    { _id: userId },
    { $pull: { userLike: { video: videoId } } },
    { new: true },
    (err) => {
      if (err) throw err;
    }
  );
  cb();
}

module.exports = {
  removeLike,
  setLike,
};
