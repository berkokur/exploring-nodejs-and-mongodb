
const mongoose = require('mongoose');

const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api';
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
});




// const Customer = mongoose.model('Customer', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Invalid email value.');
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be greater than zero.');
//             }
//         }
//     }
// });

// const customerKale = new Customer({
//     name: '  MALE Guvenlik Pty.     ',
//     email: '    berkOKUR@GMAIl.com'

// });

// customerKale.save().then(() => {
//     console.log(customerKale);
// }).catch((error) => {
//     console.log(error);
// });



