import express from "express";
import bodyParser from "body-parser";
import Thing from "./models/Thing.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const app = express()

mongoose
  .connect(
    `mongodb+srv://floriansr:${process.env.MONGODB_PASSWORD}@cluster0.ozjxx.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post("/api/stuff", (req, res) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  })
  thing.save().then(() => res.status(201).json({message: "Objet enregistré"})).catch(error => res.status(400).json({error}))
});

app.use('/api/stuff', (req, res) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

export default app