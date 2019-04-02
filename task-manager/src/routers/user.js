const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.get("/users", auth, async (req, res) => {

  try {
    const users = await User.find({});
    if (!users) {
      res.status(400).send();
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users/:id", async (req, res) => {

  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      res.status(400).send();
    }
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {

    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
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

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// router.patch("/users/:id", async (req, res) => {
//   const updateFields = Object.keys(req.body);
//   const allowedUpdateFields = ["name", "email", "password", "age"];

//   const isValidOperation = updateFields.every(field =>
//     allowedUpdateFields.includes(field)
//   );
//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid update request" });
//   }
//   try {
//     const user = await User.findById(req.params.id);
//     updateFields.forEach(field => (user[field] = req.body[field]));
//     await user.save();
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.status(200).send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

router.patch("/users/me", auth, async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowedUpdateFields = ["name", "email", "password", "age"];

  const isValidOperation = updateFields.every(field => allowedUpdateFields.includes(field));
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update request" });
  }
  try {
    const user = await User.findById(req.user._id);
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

    const token = await user.generateAuthToken();
    //  res.send({ user: user.getPublicProfile(), token }) //way 1
    res.send({ user, token }); //way 2 : toJson method in schema
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    //look at the users all tokens and remove the current one by filtering.
    //this block filters the tokens and doesn't put the current one into the user's token array.
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    })
    await req.user.save();
    res.send();

  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/logoutall", auth, async (req, res) => {

  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
})

module.exports = router;
