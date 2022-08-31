const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/getUserByToken', UserController.getUserByToken);
router.post('/uploadVideo', UserController.uploadVideo);

router.post('/getUserVideos', UserController.getUserVideos);
router.post('/getUserVideo', UserController.getUserVideo);

router.post('/setAboutText', UserController.setAboutText);
router.post('/setAboutLink', UserController.setAboutLink);

router.post(
  '/getUserSubscriptionsVideo',
  userController.getUserSubscriptionsVideo
);

router.get(
  '/getVideoPreview/:id/:videoName/:file',
  UserController.getVideoPreview
);
router.get('/getVideoFile/:id/:videoName/:file', UserController.getVideoFile);

router.get('/getUserSubscriptions', UserController.getUserSubscriptions);
router.get('/getAboutInfo/:id', UserController.getAboutInfo);
module.exports = router;
