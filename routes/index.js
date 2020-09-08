var express = require("express");
var router = express.Router();
var Userdata = require("../model/user");
var Image = require("../model/image");
var multer = require("multer");
var path = require("path");

// middle ware to upload

var storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage }).single("upload");

//

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET All users. */
router.get("/Users", function (req, res, next) {
  Userdata.find({})
    .then((user) => {
      res.json({ status: "200", data: user });
    })
    .catch((err) => {
      res.json({
        status: "404",
        msg: "Internal error, please try again later",
      });
    });
});

// signUp
router.post("/signUp", function (req, res) {
  var data = req.body;

  Userdata.create({
    name: data.name,
    email: data.email,
    password: data.password,
    image: "abc.jpg",
  })
    .then((user) => {
      res.json({
        status: "200",
        data: user,
        msg: "Your account successfully created please Sign In.",
      });
    })
    .catch((err) => {
      res.json({ status: "404", msg: err.message });
    });
});

// signIn route
router.post("/signin", function (req, res) {
  let data = req.body;
  Userdata.findOne({ email: data.email, password: data.password })
    .then((user) => {
      console.log(user);

      if (user) {
        res.json({ status: "200", data: "sucessfull Singin" });
      } else {
        res.json({ status: "404", msg: "User not found" });
      }
    })
    .catch((err) => {
      res.json({ status: "404", msg: err.message });
    });
});

// Images route

router.get("/image", function (req, res) {
  res.render("image", { title: "Express" });
});

router.post("/image", upload, function (req, res, next) {
  let data = req.file.filename;
  console.log(data);
  Image.create({
    image: data,
  })
    .then()
    .catch();

  res.render("image", { title: "Express" });
});
module.exports = router;
