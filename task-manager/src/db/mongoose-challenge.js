
const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
});


const Task = mongoose.model('Task', {
    name: {
        type: String
    },
    description: {
        type: String
    },

    isDone: {
        type: Boolean
    }
});

const testTask = new Task({
    name: 'Test Task',
    description: 'Test Task Description',
    isDone: false
});

// testTask.save()
//     .then(() => console.log(testTask))
//     .catch((error) => console.log(error));


const User = mongoose.model('User', {
    userName: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isLength(value, 5, 10)) {
                throw new Error('Username should be min 5 character and max 10 character')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not containt the word password.')
            }
        }
    }
});


const newUser = new User({
    userName: 'berkokur',
    email: 'berkokur@hotmail.com',
    password: '020306009'
});

newUser.save()
    .then(() => {
        console.log(newUser);
    })
    .catch((error) => {
        console.log(error);
    });