const express = require('express');

//controllers
const userController = require('./../controllers/user.controllers');
const userMiddleware = require('./../middlewares/users.middleware');
const authMiddleware = require('./../middlewares/auth.middlewares');
const validationMiddleware = require('./../middlewares/validations.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/').get(userController.findUsers);

router
  .route('/:id')
  .get(userMiddleware.validUser, userController.findUser)
  .patch(
    validationMiddleware.validUpdateUser,
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

module.exports = router;
