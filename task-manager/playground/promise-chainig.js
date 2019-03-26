require('../src/db/mongoose');

const User = require('../src/models/user');

const _userId = '5c88b008e87ceb42b4dce55e';


// const user = User.findByIdAndUpdate(_userId, { age: 9 })
//     .then((user) => {
//         console.log(user);
//         return User.countDocuments({ age: 9 });
//     }).then((documentCount) => {
//         console.log('user count:', documentCount);
//     }).catch((err) => {
//         console.log(err);
//     })


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ 'age': age });
    return { count, user };
}


updateAgeAndCount('5c88b008e87ceb42b4dce55e', 5)
    .then((result) => {
        console.log('user: ', result.user)
        console.log('count: ', result.count)
    })
    .catch(error => console.log('e: ', error))