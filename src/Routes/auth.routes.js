import { Router} from "express";
import {login,register,updateUser,uploadImage,getUserDetails,logout} from '../controller/Auth.js'
import verifyToken from "../middleware/verfiyuser.js";
import upload from "../middleware/uploadimage.js";
const auth= Router();


auth.route('/login').post(login)
auth.route('/register').post(register)
auth.route('/:id').put(verifyToken,updateUser).get(verifyToken,getUserDetails)
auth.route('/uploadImage').post(verifyToken,upload.single('image'),uploadImage)

auth.route('/logout').post(verifyToken,logout)


export default auth;
