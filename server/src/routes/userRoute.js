const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/getUserByToken', UserController.getUserByToken);
router.post('/uploadVideo', UserController.uploadVideo);
router.post('/getUserVideos',UserController.getUserVideos);


router.post('/getUserVideo',UserController.getUserVideo);
router.get('/getVideoPreview/:id/:videoName/:file',UserController.getVideoPreview)
router.get('/getVideoFile/:id/:videoName/:file',UserController.getVideoFile)

module.exports = router;
