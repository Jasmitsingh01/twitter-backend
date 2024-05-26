import jwt from 'jsonwebtoken'
import { AYSNCHANDLER } from '../utils/AYSNCHANDLER.js'
import User from '../models/user.model.js'
import ERROR from '../utils/ERRORREPOSE.js'

const verifyToken = AYSNCHANDLER( async (req, res , next) =>{
    try {
        const token = req?.cookies?.accessToken  || req?.headers?.authorization?.split(' ')[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!decoded) throw new ERROR(' Persmission is denied',500)
        const Finduser = await User.findById(decoded?._id);
        if(!Finduser) throw new ERROR('Please Create a account or login ',500)
        req._id = decoded?._id
        next()
    } catch (error) {
        next(error)
    }
})


export default verifyToken;
