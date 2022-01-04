var express = require("express");
var router = express.Router();
var User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

router.post("/", async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
  });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid Password");}
  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
    config.get("jwtPrivateKey")
  );


  return res.send(token);
});

module.exports = router;
