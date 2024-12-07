import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Employee from "./models/employee.js";

const dbUrl =
  "mongodb+srv://raoufbouk:raoufking7@cluster0.izt9f.mongodb.net/Authentication?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json());

app.use(cors());

app.post("/login", (req, res) => {
  Employee.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        if (data.pass === req.body.pass) {
          res.send("Success");
        } else {
          res.send("the password is incorrect");
        }
      } else {
        res.send("Invalid Credentials");
      }
    })
    .catch((err) => console.log(err));
});

app.post("/register", (req, res) => {
  Employee.create(req.body)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
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
