const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Study", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Userdata = mongoose.model("userDB", {
  name: String,
  email: String,
  password: String,
});

module.exports = Userdata;
