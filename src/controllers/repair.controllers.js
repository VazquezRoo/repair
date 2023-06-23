const Repair = require('../models/repairModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.findProducts = async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      state: 'active',
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  return res.json({
    results: repairs.length,
    status: 'succes',
    message: 'Products found',
    repairs,
  });
};

exports.updateProduct = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    message: 'The product has been updated',
  });
});

exports.createProduct = catchAsync(async (req, res) => {
  const { date, motorsNumber, description } = req.body;
  const { id } = req.sessionUser;

  const repair = await Repair.create({
    date,
    motorsNumber,
    description,
    userId: id,
  });

  return res.status(201).json({
    message: 'The product has been created!',
    repair,
  });
});

exports.findProduct = catchAsync(async (req, res) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    message: 'Product found',
    repair,
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({ state: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'the product has been deleted!',
  });
});
