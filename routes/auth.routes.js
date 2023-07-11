const express = require("express");

const User = require("../models/User.model");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const payload = { ...req.body };

  delete payload.password;

  console.log(payload);

  const salt = bcrypt.genSaltSync(13);

  payload.passwordHash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = await User.create(payload);
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const currentUser = req.body;

  try {
    const findUser = await User.findOne({
      email: currentUser.email.toLowerCase(),
    });
    if (findUser) {
      if (bcrypt.compareSync(currentUser.password, findUser.passwordHash)) {
        const loggedUser = { ...checkedUser._doc };
        delete loggedUser.passwordHash;
        req.session.user = loggedUser;
        res.redirect("/profile");
      } else {
        res.render("auth/login", {
          errorMessage: "Check your credential",
          payload: { email: currentUser.email },
        });
      }
    } else {
     
      console.log("No user with this email");
      res.render("auth/login", {
        errorMessage: "No user with this email",
        payload: { email: currentUser.email },
      });
    }
  } catch (error) {
    console.log(error);
    res.render("auth/login", {
      errorMessage: "There was an error on the server",
      payload: { email: currentUser.email },
    });
  }
});

module.exports = router;
