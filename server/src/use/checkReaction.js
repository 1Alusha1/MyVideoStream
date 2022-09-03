const User = require('../models/User');

function check(likeArray, dislikeArray, videoId, opinon) {
  let reaction = {
    likeVideo: [],
    dislikeVideo: [],
    like: '',
    dislike: '',
  };
  if (opinon) {
    if (likeArray != undefined) {
      reaction.likeVideo = likeArray.filter(
        (reaction) => reaction.video === videoId
      );
    }
    if (dislikeArray != undefined) {
      reaction.dislikeVideo = dislikeArray.filter(
        (reaction) => reaction.video === videoId
      );
    }
  } else {
    if (likeArray != undefined) {
      reaction.likeVideo = likeArray.filter(
        (reaction) => reaction.video === videoId
      );
    }
    if (dislikeArray != undefined) {
      reaction.dislikeVideo = dislikeArray.filter(
        (reaction) => reaction.video === videoId
      );
    }
  }

  reaction.likeVideo.length ? (reaction.like = false) : (reaction.like = true);
  reaction.dislikeVideo.length
    ? (reaction.dislike = false)
    : (reaction.dislike = true);
  return reaction;
}

async function checkReaction(userId, videoId, opinion) {
  const user = await User.findOne({ _id: userId });

  if (opinion) {
    return check(user.userLike, user.userDisLike, videoId, opinion);
  } else {
    return check(user.userLike, user.userDisLike, videoId, opinion);
  }
}
module.exports = checkReaction;
