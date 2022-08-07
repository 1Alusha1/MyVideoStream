const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
  authroId: String,
  videoPath: String,
  previewPath: String,
<<<<<<< HEAD
  username:String,
=======
>>>>>>> 2c52634eb45199fe62cd737a5811f3d2b1125579
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
<<<<<<< HEAD
  views:{
    type:Number,
    default:0
  },
=======
>>>>>>> 2c52634eb45199fe62cd737a5811f3d2b1125579
  comments: Array,
  dateCreate: String,
});

module.exports = mongoose.model('Video', videoSchema);
