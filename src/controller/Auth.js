import User from '../models/user.model'
import APIRESPONSE from '../utils/APIRESPONSE'
import { AYSNCHANDLER } from '../utils/AYSNCHANDLER'
import ERROR from '../utils/ERRORREPOSE'



const login =AYSNCHANDLER(async (req, res, next) => {
   try {
    
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) throw new ERROR('User not found',401)
    const isMatch = await user.comparePassword(password)
    if (!isMatch) throw new ERROR('Invalid password',402)
    const accessToken = await user.genreateAccessToken()
    const refreshToken = await user.genreateRefreshToken()
    
    new APIRESPONSE(200,"Authentication successfuly",{accessToken:accessToken, refreshToken:refreshToken},res)


   } catch (error) {
     console.error(error)
     new APIRESPONSE(error?.statusCode, error?.message, null,res)
     
   }
})


const register=AYSNCHANDLER(async(req, res, next)=>{
    try {
        const { username, password,name,email } = req.body
        if (!username ||!password ||!name ||!email) throw new ERROR("Please fill all fields",400)
        const user = new User.create({ username, password,name, email  })
        if (!user) throw new ERROR("Please try again",500)
        const accessToken = await user.genreateAccessToken()
        const refreshToken = await user.genreateRefreshToken()
        const Data=await user.save();
        if(!Data)throw new ERROR("Please try again",500)
        new APIRESPONSE(201,"User created successfully",{accessToken:accessToken, refreshToken:refreshToken},res)
    } catch (error) {
        console.error(error)
        new APIRESPONSE(error?.statusCode, error?.message, null,res)
    }
})

const updateUser= AYSNCHANDLER(async(req,res,next )=>{
    try {
        const {location,Dob,following,followers}=req.body
        if(!following && !followers && !Dob&&!location)throw new ERROR("Please provide at least one filed to update",400) 
        const user=await User.findByIdAndUpdate(req._id,{location,Dob,following,followers},{new:true})
        if(!user)throw new ERROR("Please try again",500)
        new APIRESPONSE(202,"User updated successfully",user,res)
    } catch (error) {
        console.error(error)
        new APIRESPONSE(error?.statusCode, error?.message, null,res)
    }
})


const uploadImage=AYSNCHANDLER(async(req,res,next)=>{
    try {
        const {file}=req
        if(!file)throw new ERROR("Please provide a file to upload",400);
        const ImageUrl = await UploadToCloud(file?.path);
        const user=await User.findByIdAndUpdate(req._id,{avatar:ImageUrl},{new:true})
        if(!user)throw new ERROR("user not found",401)
        
        new APIRESPONSE(202,"User updated successfully",user,res)
    } catch (error) {
        console.error(error)
        new APIRESPONSE(error?.statusCode, error?.message, null,res)
    }
})

export {login,register,updateUser,uploadImage}