const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
// const sign = jwt.sign;
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.body.id,
      email: req.body.email
    });
  }
);

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check to make sure nobody has already registered with a duplicate email
  User.find({ email: req.body.email }).then(
    user => {
      if (user) {
        return res.status(400).json({
          email: "A user with this email already exists"
        });
      } else {
        // Otherwise create a new user
        const newUser = new User({
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = { id: user.id, email: user.email };

                // sign(
                //   payload,
                //   secretOrKey;,
                //   // Tell the key to expire in one day
                //   { expiresIn: 86400 },
                //   (err, token) => {
                //     res.json({
                //       success: true,
                //       token: "Bearer " + token
                //     });
                //   }
                // );
              })
              .catch(err => console.log(err));
          });
        });
      }
    }
  );
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  console.log(errors);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "Success" });

        // const payload = {
        //   id: user.id,
        //   email: user.email
        // };

        // sign(
        //   payload,
        //   secretOrKey,
        //   // Tell the key to expire in one day
        //   { expiresIn: 86400 },
        //   (err, token) => {
        //     res.json({
        //       success: true,
        //       token: "Bearer " + token,
        //       payload
        //     });
        //   }
        // );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

module.exports = router;
