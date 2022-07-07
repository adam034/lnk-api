require("dotenv").config();
const mongoose = require("mongoose"),
  uri = process.env.MONGO_URI;
mongoose.connect(`${uri}`);
const schemaUsers = new mongoose.Schema({
  username: String,
  password: String,
  fullname: String,
  timestamp: Number,
  timelogin: Date,
  timelogout: Date,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

const Users = mongoose.model("Users", schemaUsers);
exports.Users = Users;
