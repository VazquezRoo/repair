const express = require('express');

//controllers
const authController = require('./../controllers/auth.controllers');
const validationMiddleware = require('./../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/users.middleware');
const authMiddleware = require('./../middlewares/auth.middlewares');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  authController.createUser
);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  authController.login
);

router.patch(
  '/password/:id',
  validationMiddleware.updateUserValidation,
  userMiddleware.validUser,
  authMiddleware.protect,
  authMiddleware.protectAccountOwner,
  authController.updatePassword
);

module.exports = router;
