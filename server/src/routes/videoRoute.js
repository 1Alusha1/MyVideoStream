const express = require('express');
const VideoController = require('../controllers/videoController');
const router = express.Router();

router.post('/like',VideoController.like)
router.post('/chekUserLike',VideoController.chekUserLike)

module.exports = router