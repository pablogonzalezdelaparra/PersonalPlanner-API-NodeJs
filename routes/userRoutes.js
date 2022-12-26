//Imports
const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

//Create router
const router = express.Router();

//Routes
router
  .route('/')
  .get(userController.getAllUsers)
  .delete(userController.deleteUser);

router.post('/signUp', authController.signup);
router.post('/signIn', authController.signin);

//Exports
module.exports = router;