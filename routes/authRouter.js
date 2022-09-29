import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { check } from "express-validator";

const authRouter = new Router()

authRouter.post('/signUp',[
  check('password',"Пароль должен быть больше 4 символов").isLength({min:4}),
], AuthController.registration)
authRouter.post('/signIn', AuthController.login)

export default authRouter;