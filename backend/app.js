import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import stuffRoutes from './router/stuff.js';
import userRoutes from "./router/user.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express()

//MONGODB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME_DB}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.ozjxx.mongodb.net/<dbname>?retryWrites=true&w=majority`,
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

app.use("/images", express.static(path.join(path.resolve(), "images")));

app.use('/api/stuff', stuffRoutes);
app.use("/api/auth", userRoutes);



export default app