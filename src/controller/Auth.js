import User from '../models/user.model.js'
import APIRESPONSE from '../utils/APIRESPONSE.js'
import { AYSNCHANDLER } from '../utils/AYSNCHANDLER.js'
import ERROR from '../utils/ERRORREPOSE.js'

import UploadToCloud from '../utils/COULDNARY.js'

const login =AYSNCHANDLER(async (req, res, next) => {
   try {
    
    const { username, password } = req.body
    const user = await User.findOne({ 
        $or: [
            { username: username },
            { email: username },
        ],
    })
    if (!user) throw new ERROR('User not found',401)
    const isMatch = await user.comparePassword(password)
    if (!isMatch) throw new ERROR('Invalid password',402)
    const accessToken = await user.genreateAccessToken()
    const refreshToken = await user.genreateRefreshToken()
    const option ={
        httpOnly: true,
        secure: true,
        sameSite: true,
        path:'/',
        expires: new Date(Date.now() + process.env.COOKIES_ACCESS_TOKEN_EXPIREY * 1000),
    }
    const option2={
        httpOnly: true,
        secure: true,
        sameSite: true,
        path:'/',
        expires: new Date(Date.now() + process.env.COOKIES_REFRESH_TOKEN_EXPIREY * 1000),

    }
    res.cookie('accessToken',accessToken,option).cookie('refreshToken',refreshToken,option2).status(200).send(
        new APIRESPONSE(200,"Authentication successfuly",{accessToken:accessToken, refreshToken:refreshToken,avatar:user.avatar,name:user.name,username:user.username})
    )


   } catch (error) {
     console.error(error)
     res.status(error.statusCode).send(
         new APIRESPONSE(error.statusCode,error.message || error)
     )
     
   }
})


const register=AYSNCHANDLER(async(req, res, next)=>{
    try {
        const { username, password,email } = req.body
        if (!username ||!password |!email) throw new ERROR("Please fill all fields",400)
        const Exits = await User.find({
    $or: [
        { username: username },
        { email: email },
    ],})
    if (Exits.length>0) throw new ERROR("Username or email already exists",409)
        const user =  new User({ username:username, password:password, email:email ,name: username})
        if (!user) throw new ERROR("Please try again",500)
        const accessToken = await user.genreateAccessToken()
        const refreshToken = await user.genreateRefreshToken()
        const Data=await user.save();
        if(!Data)throw new ERROR("Please try again",500)
            const option ={
                httpOnly: true,
                secure: true,
                sameSite: true,
                path:'/',
                expires: new Date(Date.now() + process.env.COOKIES_ACCESS_TOKEN_EXPIREY * 1000),
            }
            const option2={
                httpOnly: true,
                secure: true,
                sameSite: true,
                path:'/',
                expires: new Date(Date.now() + process.env.COOKIES_REFRESH_TOKEN_EXPIREY * 1000),
        
            }
    res.status(201).cookie('accessToken',accessToken,option).cookie('refreshToken',refreshToken,option2).send(
        new APIRESPONSE(201,"User created successfully",{accessToken:accessToken, refreshToken:refreshToken,avatar:user.avatar,name:user.name,username:user.username}))
    } catch (error) {
        console.error(error)
        res.status(error.statusCode).send(
            new APIRESPONSE(error.statusCode ,error.message || error )
        )
    }
})

const updateUser= AYSNCHANDLER(async(req,res,next )=>{
    try {
        const {location,Dob,following,followers,name}=req.body
        if(!following && !followers && !Dob&&!location)throw new ERROR("Please provide at least one filed to update",400) 
        const user=await User.findByIdAndUpdate(req._id,{name:name,location:location,Dob:Dob,following:following,follwers:followers},{new:true})
        if(!user)throw new ERROR("Please try again",500)
        res.status(200).send(
            new APIRESPONSE(200,"User updated successfully"))
    } catch (error) {
        console.error(error)
        res.status(error?.statusCode).send(
            new APIRESPONSE(error?.statusCode,error?.message))
    }
})


const uploadImage=AYSNCHANDLER(async(req,res,next)=>{
    try {
        const {file}=req
        if(!file)throw new ERROR("Please provide a file to upload",400);
        const ImageUrl = await UploadToCloud(file?.path);
        const user=await User.findByIdAndUpdate(req._id,{avatar:ImageUrl},{new:true})
        if(!user)throw new ERROR("user not found",401)
        
            res.status(202).send(
                new APIRESPONSE(202,"User updated successfully"))
    } catch (error) {
        console.error(error)
        res.status(error?.statusCode).send(
            new APIRESPONSE(error?.statusCode,error?.message))
    }    
})


const getUserDetails =AYSNCHANDLER(async(req,res,next)=>{
    try {
        let {_id}=req;
        const {id}=req.query
        if(id){
            _id=id;
        }
        const user=await User.findById(_id).select('-password').select('-accessToken').select('-refreshToken').select('-_id').select('-email').select('-updatedAt')
        if(!user) throw new ERROR("user not found",401)
        res.status(200).send(
            new APIRESPONSE(200,"User details",user)
    )
    } catch (error) {
        console.error(error)
        res.status(error.statusCode).send(
            new APIRESPONSE(error?.statusCode, error?.message, null)
        )
    }
});

const logout= AYSNCHANDLER(async ( req,res,next ) => {
    try {
   const {_id}=req;
   if(!_id)throw new ERROR("unknown user",400)
   const user=await User.findById(_id);
   if(!user) throw new ERROR("user not found",401)

        res.status(200).send(
            new APIRESPONSE(200,"User logout",null)
        ).clearCookie('accessToken').clearCookie('refreshToken')
    } catch (error) {
        console.error(error)
        res.status(error.statusCode).send(
            new APIRESPONSE(error?.statusCode, error?.message, null)
        )
    }
})
export {login,register,updateUser,uploadImage,getUserDetails,logout}