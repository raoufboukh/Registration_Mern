import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Employee from "./models/employee.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const dbUrl =
  "mongodb+srv://raoufbouk:raoufking7@cluster0.izt9f.mongodb.net/Authentication?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());

app.post("/login", (req, res) => {
  const { email, pass } = req.body;
  Employee.findOne({ email: email }).then((data) => {
    if (data) {
      bcrypt.compare(pass, data.pass, (err, response) => {
        if (response) {
          const token = jwt.sign({ email: data.email }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token);
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

const verify = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.send("The token is not available");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, response) => {
      if (err) return response.send("Token is wrong");
      next();
    });
  }
};

app.get("/home", verify, (req, res) => {
  return res.send("Success");
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
