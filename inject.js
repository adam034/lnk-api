const bcrypt = require("bcrypt"),
  model = require("./model/Users"),
  moment = require("moment");

console.log("===================");
console.log("=start inject user=");
console.log("===================");

async function inject() {
  const username = "admin",
    password = "admin",
    fullname = "Administrator",
    hashPassword = bcrypt.hashSync(password, 10);
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
  const checkUser = await model.Users.findOne({ username: username });
  if (checkUser === null) {
    makeUser.save((err, result) => {
      console.debug("User created");
      console.log(`Your username: ${username}, Your password: ${password}`);
      process.exit(0);
    });
  } else {
    console.debug("User exist");
    process.exit(0);
  }
}
inject();
