const express = require('express');
const router = express.Router();
const { validateToken } = require('../api/JWT');
const apiController = require('../api/api.controller');


//  POST Registration/Login/Logout 
router.post('/register', apiController.registration);
router.post('/login', apiController.login);
router.post('/logout', apiController.logout);

// GET Posts/Photos
router.get('/posts', validateToken, apiController.getPosts);
router.get('/photos', validateToken, apiController.getPhotos);

module.exports = router;