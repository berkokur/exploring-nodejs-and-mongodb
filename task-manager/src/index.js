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



const bcrypt = require("bcryptjs");
const myFunc = async () => {
  const pass = "Berk1234!";
  const hashed = await bcrypt.hash(pass, 8);
  const isMatch = await bcrypt.compare(pass, hashed);
  const isMatched = await bcrypt.compare(pass.toLowerCase(), hashed);

  console.log("pass:", pass);
  console.log("hashed pass:", hashed);
  console.log("is matched:", isMatch);
  console.log("is matched:", isMatched);
};

myFunc();

//you removed the "test": "mocha **/*.test.js" from scripts in package json.
