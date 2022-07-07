const jwt = require("jsonwebtoken"),
  key = process.env.JWT_SECRET,
  model = require("../model/Users");
exports.auth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  let token;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({
      message: "Not Authenticated",
    });

    //return next(new errorResponse('Not Authenticated',401))
  }
  try {
    let verify = jwt.verify(token, key);
    req.user = await model.Users.findOne({ _id: verify.id }).clone();
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Not Authenticated",
    });
  }
};
