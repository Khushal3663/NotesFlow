import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";



const app = express();

import cors from 'cors';
app.use(cors())
app.use(bodyParser.json())


// db connection

const mydb = async () => {
  const uri = process.env.DB_URL;
  try {
    await mongoose.connect(uri);

    console.log("connected to Mongodb Atlas");
} catch (error) {
      console.log("Failed to connect"+ error.message);

  }
};

mydb();

// User Router

import userRouter from "./routers/users.router.js";
import notesRouter from "./routers/notes.router.js";
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notes',notesRouter);


app.get("/", (req, res) => {
  res.send("notes app");
});

const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log("server running on port", port);
});
