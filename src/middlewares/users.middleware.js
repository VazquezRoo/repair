const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError(`User with id: ${id} not found`, 404));
  }

  req.user = user;
  next();
});

// exports.validEmployee = catchAsync(async (req, res, next) => {
//   const { id } = req.params;

//   const user = await User.findOne({
//     where: {
//       id,
//       status: 'active',
//       role: 'employee',
//     },
//   });

//   if (user.status === 'disabled') {
//     return next(new AppError(`User with id: ${id} not found`, 404));
//   }
//   if (user.role === 'client') {
//     return next(new AppError(`User with id: ${id} is not employee`, 404));
//   }

//   req.user = user;
//   next();
// });
