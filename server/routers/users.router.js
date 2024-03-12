import express from "express";
import { createUser, getUsers, loginUser } from "../controllers/user.controller.js";

const userRouter = express.Router();


userRouter.get('/', getUsers);
userRouter.post('/register', createUser);
userRouter.post('/login',loginUser);


export default userRouter;