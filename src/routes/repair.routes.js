const express = require('express');

//controllers
const repairController = require('../controllers/repair.controllers');
const validationMiddleware = require('./../middlewares/validations.middleware');
const repairMiddleware = require('./../middlewares/repairs.middleware');
const userMiddleware = require('./../middlewares/users.middleware');
const authMiddleware = require('./../middlewares/auth.middlewares');

const router = express.Router();

// router.use(userMiddleware.validUser);
// router.use(authMiddleware.protect);

router
  .route('/')
  .get(
    authMiddleware.protect,
    authMiddleware.restrictTo,
    repairController.findProducts
  )
  .post(
    validationMiddleware.createRepairValidation,
    authMiddleware.protect,
    repairController.createProduct
  );

// router.use(userMiddleware.validEmployee);

router

  .route('/:id')
  .get(
    repairMiddleware.validRepair,
    authMiddleware.protect,
    authMiddleware.restrictTo,
    repairController.findProduct
  )
  .patch(
    repairMiddleware.validRepair,
    authMiddleware.protect,
    authMiddleware.restrictTo,
    repairController.updateProduct
  )
  .delete(
    repairMiddleware.validRepair,
    authMiddleware.protect,
    authMiddleware.restrictTo,
    repairController.deleteProduct
  );

module.exports = router;
