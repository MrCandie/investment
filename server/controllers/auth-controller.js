const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const sendEmailVerification = require("./../utils/sendEmailVerification");

const User = require("./../models/user-model");
const catchAsync = require("./../utils/catch-async");
const AppError = require("./../utils/app-error");

exports.setUserId = (req, res, next) => {
  if (!req.params.id) req.params.id = req.user.id;
  next();
};

const createJWTToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = createJWTToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: false,
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  return res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const token = crypto.randomBytes(32).toString("hex");
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    verificationToken: token,
  });

  const origin = "http://localhost:3000/";

  await sendEmailVerification({
    name: newUser.name,
    email: newUser.email,
    verificationToken: token,
    origin,
  });

  createSendToken(newUser, 201, res);
});

exports.sendVerifyRequest = catchAsync(async (req, res, next) => {
  const origin = "http://localhost:3000/";
  await sendEmailVerification({
    name: req.user.name,
    email: req.user.email,
    verificationToken: req.user.token,
    origin,
  });

  res.status(200).json({
    status: "success",
    message: "Check your mail inbox for verification mail",
  });
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOneAndUpdate(
    { email: email },
    { emailIsVerified: true, verified: Date.now(), verificationToken: "" }
  );

  if (!user) {
    return next(new AppError("user not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Email verified!",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    next(new AppError("Enter a valid email or passowrd", 400));

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in...Login to continue", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new AppError("You login token is invalid", 401));
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("user no longer exist", 404));
  }

  if (user.passwordChangedAfter(decoded.iat)) {
    next(
      new AppError(
        "User recently changed password, login again to continue",
        401
      )
    );
  }

  req.user = user;

  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
      return next(
        new AppError(
          "You do not have permission to perform this operation",
          403
        )
      );
    }
    next();
  };

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, password, passwordConfirm } = req.body;

  const user = await User.findById(req.params.id).select("+password");
  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError("incorrect password", 401));
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;

  await user.save();

  createSendToken(user, 200, res);
});
