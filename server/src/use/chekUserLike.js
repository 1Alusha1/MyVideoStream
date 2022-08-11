const User = require('../models/User');

async function chekUserLike(userId, videoId) {
  const user = await User.findOne({ _id: userId });
  let flag;
  if (user.userLike.length) {
    flag = user.userLike.filter((like) =>
      like.video === videoId ? true : false
    );
  }
  return flag;
}

module.exports = chekUserLike;
