const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on the port " + port);
});



//const bcrypt = require("bcryptjs");
// const myFunc = async () => {
//   const pass = "Berk1234!";
//   const hashed = await bcrypt.hash(pass, 8);
//   const isMatch = await bcrypt.compare(pass, hashed);
//   const isMatched = await bcrypt.compare(pass.toLowerCase(), hashed);

//   console.log("pass:", pass);
//   console.log("hashed pass:", hashed);
//   console.log("is matched:", isMatch);
//   console.log("is matched:", isMatched);
// };
// const jwt = require("jsonwebtoken")
// const myFunc = async () => {
//   const token = jwt.sign({ _id: 'Berk123' }, 'mySecretisYourReveal', { expiresIn: '5 seconds' });
//   console.log(token);
//   const data = jwt.verify(token, 'mySecretisYourReveal');
//   console.log(data);
// }
// myFunc();

//you removed the "test": "mocha **/*.test.js" from scripts in package json.


const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
  // const task = await Task.findById('5ca1a81b92e84f2d9426ab91');
  // console.log(task);
  // await task.populate('owner').execPopulate();
  // console.log(task.owner);

  // const user = await User.findById('5ca1a6f0295f2c3888c1b59d');
  // await user.populate('tasks').execPopulate();
  // console.log(user.tasks);


}
main();