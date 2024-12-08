import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Employee from "./models/employee.js";
import bcrypt, { compare } from "bcrypt";

const dbUrl =
  "mongodb+srv://raoufbouk:raoufking7@cluster0.izt9f.mongodb.net/Authentication?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json());

app.use(cors());

app.post("/login", (req, res) => {
  const { email, pass } = req.body;
  Employee.findOne({ email: email }).then((data) => {
    if (data) {
      bcrypt.compare(pass, data.pass, (err, response) => {
        if (response) {
          res.json("Success");
        } else {
          res.json("The password is incorrect");
        }
      });
    } else {
      res.json("Invalid Credentials");
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, pass } = req.body;
  bcrypt
    .hash(pass, 10)
    .then((hash) => {
      Employee.create({ name, email, pass: hash })
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err.message));
  // Employee.create(req.body)
  //   .then((data) => res.send(data))
  //   .catch((err) => console.log(err));
});

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
