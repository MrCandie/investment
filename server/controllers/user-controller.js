const path = require("path");
const cloudinary = require("cloudinary").v2;

const User = require("./../models/user-model");
const catchAsync = require("./../utils/catch-async");
const AppError = require("./../utils/app-error");

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const body = {
    name: req.body.name,
    image: req.body.image,
  };
  const user = await User.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUserAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return res.status(204).json({
    status: "success",
    data: null,
  });
});

// exports.uploadImage = catchAsync(async (req, res, next) => {
//   if (!req.files) {
//     return next(new AppError("no file uploaded", 400));
//   }
//   let productImage = req.files.image;
//   if (!productImage.mimetype.startsWith("image")) {
//     return next(new AppError("please upload an image", 400));
//   }
//   const maxSize = 10000000;
//   if (productImage.size > maxSize) {
//     return next(new AppError("please upload image smaller than 10mb"));
//   }

//   const imagePath = path.join(
//     __dirname,
//     "../../client/public/images/" + `${productImage.name}`
//   );
//   await productImage.mv(imagePath);

//   res.status(201).json({
//     status: "success",
//     image: {
//       src: `/images/${productImage.name}`,
//     },
//   });
// });

exports.uploadImage = catchAsync(async (req, res, next) => {
  const productImage = req.files.image;

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "maeve",
    }
  );
  return res.status(201).json({
    src: result.secure_url,
  });
});
