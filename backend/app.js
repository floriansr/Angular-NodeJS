import express from "express";
import bodyParser from "body-parser";
import Thing from "./models/Thing.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const app = express()

//MONGODB
mongoose
  .connect(
    `mongodb+srv://floriansr:${process.env.MONGODB_PASSWORD}@cluster0.ozjxx.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//PARSER
app.use(bodyParser.json());

//CREATE
app.post("/api/stuff", (req, res) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  })
  thing.save().then(() => res.status(201).json({message: "Objet enregistré"})).catch(error => res.status(400).json({error}))
});

//READ
app.get("/api/stuff/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

app.get('/api/stuff', (req, res) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

//MODIFICATE
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
});

//DELETE
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
});

export default app