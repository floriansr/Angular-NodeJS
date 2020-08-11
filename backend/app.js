import express from "express";

const app = express()

app.use((req, res, next) => {
  console.log("Response sent !")
  next()
})

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "response" })
  next()
})

app.use((req, res) => {
  console.log("Success!");
});

export default app