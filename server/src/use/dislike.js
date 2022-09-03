const Video = require('../models/Video');
const User = require('../models/User');

function setDislike(userId, videoId, cb) {
  Video.findOneAndUpdate({ _id: videoId }, { $inc: { dislike: 1 } }, (err) => {
    if (err) throw err;
  });
  User.findOneAndUpdate(
    { _id: userId },
    { $push: { userDisLike: { video: videoId } } },
    { new: true },
    (err) => {
      if (err) throw err;
    }
  );
  cb();
}

function removeDislike(userId, videoId, cb) {
  Video.findOneAndUpdate({ _id: videoId }, { $inc: { dislike: -1 } }, (err) => {
    if (err) throw err;
  });
  User.findOneAndUpdate(
    { _id: userId },
    { $pull: { userDisLike: { video: videoId } } },
    { new: true },
    (err) => {
      if (err) throw err;
    }
  );
  cb();
}

module.exports = {
  setDislike,
  removeDislike,
};
