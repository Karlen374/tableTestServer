import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, 'secret',{expiresIn: "24h"})
}

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return res.status(400).json({message:"Ошибка при регистрации ", errors})
      }
      const {userName, password} = req.body
      const candidate =await User.findOne({userName})
      if (candidate) {
        return res.status(400).json({message: "Пользователь с таким именем уже существует"})
      }
      const hashPassword = bcrypt.hashSync(password,7)
      const user = new User({ userName,password:hashPassword })
      await user.save()
      return res.json({message: "Пользователь успешно зарегистрирован"})
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Registration Error"});
    } 
  }
  async login(req, res) {
    try {
      const {userName,password} = req.body
      const user = await User.findOne({userName})
      if (!user) {
        return res.status(400).json({message:`Пользователь ${userName} не найден `})
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({message: 'Введен неверный пароль'})
      }
      const token = generateAccessToken(user._id, user.roles)
      return res.json({
        _id:user._id,
        userName:user.userName,
        token})
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Login Error"});
    }
  }
}

export default new AuthController();