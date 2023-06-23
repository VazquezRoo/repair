const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'active',
    },
  });

  return res.json({
    results: users.length,
    status: 'success',
    message: 'Users found',
    users,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { sessionUser } = req;
  const { name, email, role } = req.body;

  await sessionUser.update({ name, email, role });

  res.status(200).json({
    status: 'success',
    message: 'The user has been updated',
  });
});

exports.findUser = catchAsync(async (req, res) => {
  const { user } = req;

  return res.status(200).json({
    status: 'success',
    message: 'User found',
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await user.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'the user has been deleted!',
  });
});
