const User = require('../models/User');

async function chekUserLikeOrDislike(userId, videoId, opinion = true) {
  const user = await User.findOne({ _id: userId });
  let flag;
  if (opinion) {
    if (user.userLike.length) {
      flag = user.userLike.filter((like) =>
        like.video === videoId ? true : false
      );
    }
  } else {
    if (user.userDisLike.length) {
      flag = user.userDisLike.filter((disLike) =>
        disLike.video === videoId ? true : false
      );
    }
  }
  return flag;
}

module.exports = chekUserLikeOrDislike;
