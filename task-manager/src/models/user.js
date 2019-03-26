const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
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
    },
    age: {
        type: Number
    }
});

module.exports = User;