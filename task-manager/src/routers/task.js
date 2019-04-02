const express = require("express");
const Task = require("../models/task");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);

  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();

    if (!task) {
      return res.status(400).send("task save failed");
    }

    res.status(201).send("task saved");
  } catch (e) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowedFields = ["name", "isDone"];
  const isValidUpdateOperation = updateFields.every(field =>
    allowedFields.includes(field)
  );

  if (!isValidUpdateOperation) {
    return res.status(400).send({ error: "Invalid update operation" });
  }

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    console.log(req.params.id, req.user._id)
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
    // const task = await Task.findById(req.params.id);

    if (task) {
      updateFields.forEach(field => (task[field] = req.body[field]));
      await task.save();
      return res.status(200).send(task);
    }
    res.status(404).send();

  } catch (e) {

    res.status(500).send(e);
    console.log(task)
    console.log(e)
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {

    // const tasks = await Task.find({ owner: req.params._id });
    // if (tasks) {
    //const user = await User.findById(req.user._id);
    // await user.populate('tasks').execPopulate();

    //await req.user.populate('tasks').execPopulate();

    const match = {};
    if (req.query.isDone) {
      match.isDone = req.query.isDone === 'true'
    }

    await req.user.populate({
      path: 'tasks',
      match
    }).execPopulate();

    if (req.user.tasks) {
      return res.status(200).send(req.user.tasks);
    } else {
      return res.status(404).send();
    }

  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }

});

router.get("/tasks/me", auth, async (req, res) => {

  try {

    // const tasks = await Task.find({ owner: req.params._id });
    // if (tasks) {
    //const user = await User.findById(req.user._id);
    // await user.populate('tasks').execPopulate();

    await req.user.populate('tasks').execPopulate();
    if (req.user.tasks) {
      return res.status(200).send(req.user.tasks);
    } else {
      return res.status(404).send();
    }

  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }

  // Task.find({})
  //   .then(result => {
  //     if (!result) {
  //       return res.status(404).send();
  //     } else {
  //       return res.status(200).send(result);
  //     }
  //   })
  //   .catch(error => {
  //     res.status(500).send(error);
  //   });
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    //const task = Task.findById(req.params.id);
    const task = await Task.findOne({ _id, owner: req.user._id })
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
});

module.exports = router;
