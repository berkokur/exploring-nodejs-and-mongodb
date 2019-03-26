

const express = require('express');
const Task = require('../models/task');

const router = new express.Router();
router.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save()
        .then(() => { res.status(201).send(task) })
        .catch((error) => { res.status(500).send(error) });
});

router.patch('/tasks/:id', async (req, res) => {
    const updateFields = Object.keys(req.body)
    const allowedFields = ['name', 'isDone']
    // const isValidUpdateOperation = updateFields.every((field) => {
    //     return allowedFields.includes(field);
    // })

    const isValidUpdateOperation = updateFields.every((field) => allowedFields.includes(field));

    if (!isValidUpdateOperation) {
        return res.status(400).send({ 'error': 'Invalid update operation' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(task);

    } catch (e) {
        res.status(500).send(e);
    }

});

router.get('/tasks', (req, res) => {
    Task.find({}).then((result) => {
        if (!result) {
            return res.status(404).send();
        }
        else {
            return res.status(200).send(result);
        }
    }).catch((error) => { res.status(500).send(error) });
});

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(result);

    } catch (e) {
        res.status(500).send(e)
    }
});


module.exports = router;