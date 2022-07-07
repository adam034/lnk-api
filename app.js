require("dotenv").config();
const express = require("express"),
  bcrypt = require("bcrypt"),
  app = express(),
  PORT = process.env.PORT,
  jwt = require("jsonwebtoken"),
  expired = process.env.JWT_EXPIRE,
  signature = process.env.JWT_SECRET,
  swaggerUI = require('swagger-ui-express'),
  openApiDoc = require('./openApiDoc'),
  router = express.Router(),
  { auth } = require("./middleware/Auth");
moment = require("moment");

cors = require("cors");
const model = require("./model/Users");
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
/*
    domain login
*/
router.post("/login", async (req, res, next) => {
  console.log("wkwkwk")
  const { username, password } = req.body;
  const getUser = await model.Users.findOne({ username: username }).clone();

  let response = null;
  if (!getUser) {
    response = {
      success: false,
      message: "user not found",
    };
    res.status(200).json(response);
  }

  const isMatchPassword = bcrypt.compareSync(password, getUser.password);
  if (!isMatchPassword) {
    response = {
      success: false,
      message: "password not match",
    };
    res.status(200).json(response);
  }

  await model.Users.updateOne(
    { _id: getUser._id },
    { timelogin: moment().format("YYYY-MM-DD HH:mm:ss") }
  ).clone();
  const token = jwt.sign(
    {
      id: getUser._id,
    },
    signature,
    {
      expiresIn: expired,
    }
  );

  res.status(200).json({
    success: true,
    message: "success login",
    data: {
      token: token,
    },
  });
});
/*
    domain register
*/
router.post("/register", async (req, res, next) => {
  const { username, password, fullname } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  const makeUser = new model.Users({
    username: username,
    password: hashPassword,
    fullname: fullname,
    timestamp: 0,
    timelogin: null,
    timelogout: null,
    createdAt: moment().format("YYYY-MM-DD"),
    updatedAt: moment().format("YYYY-MM-DD"),
    deletedAt: null,
  });
  try {
    await model.Users.findOne({ username: username }, async (err, result) => {
      if (result === null) {
        makeUser.save((err, result) => {
          res.status(200).json({
            success: true,
            message: "success create user",
            data: result,
          });
        });
      } else {
        res.status(200).json({
          success: false,
          message: "user already exist",
        });
      }
    }).clone();
  } catch (error) {
    console.log(error);
  }
});
/*
    domain statistik
*/
router.get("/statistik", async (req, res, next) => {
  const getUsers = await model.Users.find({}).clone();
  let data = getUsers.map((user) => {
    return {
      id: user._id,
      username: user.username,
      fullname: user.fullname,
      visited:
        user.timelogout === null
          ? 0
          : moment
              .duration(moment(user.timelogout).format("HH:mm"))
              .asMinutes() -
            moment.duration(moment(user.timelogin).format("HH:mm")).asMinutes(),
    };
  });

  res.status(200).json({
    sucess: true,
    message: "success get statistik",
    data: data,
  });
});
/*
    domain logout
*/
router.post("/logout", auth, async (req, res, next) => {
  const { _id } = req.user;
  await model.Users.updateOne(
    { _id: _id },
    { timelogout: moment().format("YYYY-MM-DD HH:mm:ss") }
  );
  res.status(200).json({
    success: true,
    message: "success logout",
  });
});
app.use("/api/v1",router)
app.use("/api-docs",
        swaggerUI.serve,
        swaggerUI.setup(openApiDoc.default(),{
          swaggerOptions: { filter: true, persistAuthorization: true }
        })
  )
app.get("*", (req, res, next) => {
  res.status(200).json({
    message: "Service On",
  });
});
app.listen(PORT, () => {
  console.log(` Service berjalan pada port ${PORT}`);
});
