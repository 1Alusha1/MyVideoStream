const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  userVideo: Array,
  userSubscriptions: Array,
  usersFollowers: Array,
  userLike: Array,
  watchedVideos: Array,
  token: String,
});

module.exports = mongoose.model('User', userSchema);
