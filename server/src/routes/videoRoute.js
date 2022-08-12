const express = require('express');
const VideoController = require('../controllers/videoController');
const router = express.Router();

router.post('/like',VideoController.like)
router.post('/disLike',VideoController.disLike)
router.post('/subscribe',VideoController.subscribe)

module.exports = router