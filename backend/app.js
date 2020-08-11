import express from "express";

const app = express()

app.use((req, res) => {
  res.json({message: "voici le json"})
})

export default app