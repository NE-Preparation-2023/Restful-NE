const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {protect, isAdmin} = require('../middlewares/protect');

router.post('/signup', authController.userSignup);
router.post('/login',  authController.userLogin);
router.post('/logout', protect, isAdmin, authController.userLogout);

module.exports = router;