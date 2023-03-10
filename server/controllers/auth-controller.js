const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const speakeasy = require("speakeasy");

const sendEmailVerification = require("./../utils/sendEmailVerification");
const sendPasswordVerification = require("./../utils/sendPasswordVerification");

const User = require("./../models/user-model");
const catchAsync = require("./../utils/catch-async");
const AppError = require("./../utils/app-error");

// setting user ID for populating
exports.setUserId = (req, res, next) => {
  if (!req.params.id) req.params.id = req.user.id;
  next();
};

// creating JWT
const createJWTToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// Creating auth send token
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

// sign up controller
exports.signup = catchAsync(async (req, res, next) => {
  const token = crypto.randomBytes(32).toString("hex");
  const secretToken = speakeasy.generateSecret();

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    verificationToken: token,
    secret: secretToken.base32,
  });

  // const origin = "http://localhost:3000/";
  const origin = "https://investment-sigma.vercel.app";

  // await sendEmailVerification({
  //   name: newUser.name,
  //   email: newUser.email,
  //   verificationToken: token,
  //   origin,
  // });

  createSendToken(newUser, 201, res);
});

// email verification request
exports.sendVerifyRequest = catchAsync(async (req, res, next) => {
  // const origin = "http://localhost:3000/";
  // const origin = "https://investment-sigma.vercel.app";
  const origin = req.get("origin");

  const origin1 = `${req.get("x-forwarded-proto")}://${req.get(
    "x-forwarded-host"
  )}`;
  console.log(origin1);
  console.log(req.get("origin"));

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

// verify email
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

// login controller
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    next(new AppError("Enter a valid email or passowrd", 400));

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }

  if (!user.authIsSet) {
    res.status(403).json({
      message: "set up 2FA to continue login",
      secret: user.secret,
      token: createJWTToken(user._id),
    });
  }

  createSendToken(user, 200, res);
});

// 2FA authentication conrtroller
exports.authentication = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return next(new AppError("Kindly enter a token", 400));
  }
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const verified = speakeasy.totp.verify({
    secret: user.secret,
    encoding: "base32",
    token,
  });
  if (!verified) {
    return next(new AppError("Token authentication failed...Try again"));
  }

  user.authIsSet = true;

  await user.save();

  res.status(200).json({
    status: "success",
    verified: verified,
  });
});

// token validation
exports.tokenValidation = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return next(new AppError("Kindly enter a token", 400));
  }
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const validated = speakeasy.totp.verify({
    secret: user.secret,
    encoding: "base32",
    token,
  });
  if (!validated) {
    return next(new AppError("Token authentication failed...Try again"));
  }

  res.status(200).json({
    status: "success",
    verified: verified,
  });
});

// protecting API route controller
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

  // if (user.passwordChangedAfter(decoded.iat)) {
  //   next(
  //     new AppError(
  //       "User recently changed password, login again to continue",
  //       401
  //     )
  //   );
  // }

  req.user = user;

  next();
});

// authorization controller
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

// update password controller
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

// forgot password controller
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("Please enter your email address", 400));
  }
  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new AppError("invalid email address", 400));
  }

  const token = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const origin = "http://localhost:3000/";

  await sendPasswordVerification({
    name: user.name,
    email: user.email,
    resetToken: token,
    origin,
  });
  res.status(200).json({
    status: "success",
    message: "password reset email sent",
  });
});

// reset password controller
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const { password, passwordConfirm } = req.body;

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    return next(new AppError("token is invalid or expired", 400));
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  createSendToken(user, 200, res);
});
