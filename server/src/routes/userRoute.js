const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/getUserByToken', UserController.getUserByToken);
router.post('/uploadVideo', UserController.uploadVideo);
<<<<<<< HEAD
router.post('/getUserVideo',UserController.getUserVideo);
router.get('/getVideoPreview/:id/:videoName/:file',UserController.getVideoPreview)
router.get('/getVideoFile/:id/:videoName/:file',UserController.getVideoFile)

=======
>>>>>>> 2c52634eb45199fe62cd737a5811f3d2b1125579

module.exports = router;
