const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .delete(userController.deleteUser);

router.post('/signUp', authController.signup);
router.post('/signIn', authController.signin);

module.exports = router;