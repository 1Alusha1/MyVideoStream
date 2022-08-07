const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
  authroId: String,
  videoPath: String,
  previewPath: String,
  username:String,
  name: String,
  description: String,
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  views:{
    type:Number,
    default:0
  },
  comments: Array,
  dateCreate: String,
});

module.exports = mongoose.model('Video', videoSchema);
