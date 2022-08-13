const express = require('express');
const VideoController = require('../controllers/videoController');
const router = express.Router();

router.post('/like',VideoController.like)
router.post('/disLike',VideoController.disLike)
router.post('/subscribe',VideoController.subscribe)
router.post('/comment',VideoController.comment)
router.post('/getComment',VideoController.getComment)
router.get('/view',VideoController.view)

module.exports = router