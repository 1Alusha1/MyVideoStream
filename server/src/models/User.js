const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  userVideo: Array,
  userSubscriptions: Array,
  usersFollowers: Array,
  userLike: Array,
  userDisLike: Array,
  watchedVideos: Array,
  token: String,
  about: Object
});

module.exports = mongoose.model('User', userSchema);
