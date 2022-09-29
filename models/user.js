import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js';

const User = new mongoose.Schema({
  userName: {type: String, required: true},
  password: {type: String, required: true},
})

export default mongoose.model('User',User)