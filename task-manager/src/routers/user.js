const express = require("express");
const User = require("../models/user");

const router = new express.Router();

router.get("/users", (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).send(users);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      } else {
        return res.status(200).send(user);
      }
    })
    .catch(error => {
      return res.status(500).send(error);
    });
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "no user found to delete" });
    }
    res.status(200).send({ success: "user deleted", user });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/:id", async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowedUpdateFields = ["name", "email", "password", "age"];

  const isValidOperation = updateFields.every(field =>
    allowedUpdateFields.includes(field)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update request" });
  }
  try {
    const user = await User.findById(req.params.id);
    updateFields.forEach(field => (user[field] = req.body[field]));
    await user.save();
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);

  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
