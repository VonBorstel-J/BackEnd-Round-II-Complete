const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const auth = require("http-auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');

const router = express.Router();
const Registration = mongoose.model("Registration");
const basic = auth.basic({
  file: path.join(__dirname, "../users.htpasswd"),
});

router.get("/", (req, res) => {
  //res.send('It works!');
  res.render("index", { title: "home page", path: req.url });
});

router.get("/register", (req, res) => {
  //res.send('It works!');
  res.render("index", { title: "register page", path: req.url });
});

router.get(
  "/registrations",
  basic.check((req, res) => {
    Registration.find()
      .then((registrations) => {
        res.render("registrants", {
          title: "Listing registrations",
          registrations,
        });
      })
      .catch(() => {
        res.send("Sorry! Something went wrong.");
      });
  })
);

router.get("/thankyou", (req, res) => {
  res.render("index", {
    title: "thankyou page",
    path: req.url,
    content: "Thank you for your registration!"
  });
});

router.get("/dberror", (req, res) => {
  res.render("index", {
    title: "error page",
    path: req.url,
    content: "Sorry! Something went wrong."
  });
});

router.post(
  "/register",
  [
    check("name").isLength({ min: 1 }).withMessage("Please enter a name"),
    check("email").isLength({ min: 1 }).withMessage("Please enter an email"),
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const salt = await bcrypt.genSalt(10);

      const body = {
        ...req.body,
        password: await bcrypt.hash(req.body.password, salt)
      }

      const registration = new Registration(body);
      
      registration
        .save()
        .then(() => {
          res.redirect("/thankyou");
        })
        .catch((err) => {
          res.redirect("/dberror");
        });
    } else {
      res.render("index", {
        title: "register page",
        path: req.url,
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

module.exports = router;
