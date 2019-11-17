import { Router } from "express";
const router = Router();
import bcrypt from "bcryptjs";
import User from "../../models/User";
import { sign } from "jsonwebtoken";
import { secretOrKey } from "../../config/keys";
import passport from "passport";

import validateRegisterInput from "../../validation/register";

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.body.id,
      username: req.body.username
    });
  }
);

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check to make sure nobody has already registered with a duplicate email
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      // Throw a 400 error if the email address already exists
      return res.status(400).json({
        username: "A user with this username already exists"
      });
    } else {
      // Otherwise create a new user
      const newUser = new User({
        username: req.body.username,
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
              const payload = { id: user.id, username: user.username };

              sign(
                payload,
                secretOrKey,
                // Tell the key to expire in one day
                { expiresIn: 86400 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
