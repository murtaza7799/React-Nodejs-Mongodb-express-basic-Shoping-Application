var express = require("express");
var router = express.Router();
var Product = require("../models/Product");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
/* GET home page. */
router.get("/login", function (req, res, next) {
  return res.render("site/login");
});
router.get("/signup", function (req, res, next) {
  return res.render("site/signup");
});

router.get("/about", function (req, res, next) {
  return res.render("site/about");
});
router.post("/login", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash("danger", "User with this email not present");
    return res.redirect("/login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    req.flash("success", "Logged in Successfully");
    return res.redirect("/");
  } else {
    req.flash("danger", "Invalid Password");
    return res.redirect("signup/login");
  }
});
router.get("/signup", function (req, res, next) {
  return res.render("site/signup");
});
router.get("/logout", async (req, res) => {
  req.session.user = null;
  console.log("session clear");
  return res.redirect("/login");
});
router.post("/signup", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    req.flash("danger", "User with given email already registered");
    return res.redirect("site/signup");
  }
  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();
  return res.redirect("/login");
});
router.get("/contact-us", function (req, res, next) {
  return res.render("site/contact");
});
router.get("/", async function (req, res, next) {
  let products = await Product.find();
  return res.render("site/homepage", {
    products,
  });
});
// router.get("/products", async function (req, res, next) {
//   let products = await Product.find();
//   return res.render("site/products", {
//     products,
//   });
// });
router.get('/products/:page', function(req, res, next) {
  var perPage = 9
  var page = req.params.page || 1

  Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, products) {
          Product.count().exec(function(err, count) {
              if (err) return next(err)
              res.render('site/products', {
                  products: products,
                  current: page,
                  pages: Math.ceil(count / perPage)
              })
          })
      })
})

module.exports = router;
