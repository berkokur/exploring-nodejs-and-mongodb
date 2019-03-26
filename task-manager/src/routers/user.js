
const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.get('/users', (req, res) => {

    User.find({}).then((users) => {
        res.status(200).send(users)
    }).catch((error) => {
        res.status(500).send(error);
    })

});

router.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send();
        } else {
            return res.status(200).send(user);
        }
    }).catch((error) => {
        return res.status(500).send(error);
    });

})

//transformed as async method
// router.post('/users', (req, res) => {

//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     })

//     // res.send(user);
//     // const user = new User(req.body);

//     user.save()
//         .then(() => { res.status(201).send(user) })
//         .catch((error) => {
//             res.status(400).send(error)
//         });

// });

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.delete('/users/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send({ 'error': 'no user found to delete' })
        }
        res.status(200).send({ 'success': 'user deleted', user })
    } catch (e) {
        res.status(500).send(e);
    }
});



module.exports = router;
