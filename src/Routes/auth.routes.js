import { Router} from "express";
import {login,register,updateUser,uploadImage} from '../controllers/Auth.js'
const auth= Router();


auth.route('/login').get(login)
auth.route('/register').post(register)
auth.route('/').put(updateUser)
auth.route('/uploadImage').post(uploadImage)

export default auth;
