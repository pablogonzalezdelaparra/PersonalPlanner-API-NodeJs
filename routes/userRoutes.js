const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', userController.getAllUsers)
router.post('/signUp', authController.signup);
router.post('/signIn', authController.signin);

// Generic routes (Admin)
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;