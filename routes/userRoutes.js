const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', userController.getAllUsers)
router.post('/signUp', authController.signup);
router.post('/signIn', authController.signin);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
//router.patch('/updateMe', userController.updateMe);
//router.delete('/deleteMe', userController.deleteMe);

module.exports = router;