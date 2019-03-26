
const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('Task', {
    name: {
        type: String,
        validate(value) {
            if (!validator.isLength(value, 5)) {
                throw new Error('Task name should include min 5 character')
            }
        }
    },
    description: {
        type: String
    },

    isDone: {
        type: Boolean,
        required: true
    }
});


module.exports = Task;