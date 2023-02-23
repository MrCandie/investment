const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user-route");
const walletRouter = require("./routes/wallet-route");
const depositRouter = require("./routes/deposit-route");
const dashboardRouter = require("./routes/dashboard-route");
const globalErrorController = require("./controllers/error-controller");
const AppError = require("./utils/app-error");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use(bodyParser.json());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/wallets", walletRouter);
app.use("/api/v1/dashboards", dashboardRouter);
app.use("/api/v1/deposits", depositRouter);

app.all("*", (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorController);

module.exports = app;
