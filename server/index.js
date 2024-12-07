import express from "express";
import mongoose from "mongoose";

const dbUrl =
  "mongodb+srv://raoufbouk:raoufking7@cluster0.izt9f.mongodb.net/Authentication?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json());

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to database");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
