import mongoose from "mongoose";

const employee = new mongoose.Schema({
  name: String,
  email: String,
  pass: String,
});

const Employee = mongoose.model("Employee", employee);

export default Employee;
