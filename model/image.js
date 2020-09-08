const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Study", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Image = mongoose.model("Image", {
  image: String,
});

module.exports = Image;
