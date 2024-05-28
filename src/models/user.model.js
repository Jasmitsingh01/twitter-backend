import { Schema, Types, model } from 'mongoose'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true, 
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,

    },
    Dob: {
        type: Date,

    },
    follwers: {
        type: [Types.ObjectId],
        ref: 'users',
    },
    following: {
        type: [Types.ObjectId],
        ref: 'users',
    },
    avatar: {
        type: String,
        default:'https://res.cloudinary.com/ddhame7f7/image/upload/v1716891089/wbk2ntprmhzkmksxvqfa.webp'
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
},{
    timestamps: true,
})


userSchema.pre('save',async function (){
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.genreateAccessToken = async function () {
    this.accessToken =  jwt.sign({
        id: this._id,
        name: this.name,
        username: this.username,
        email: this.email,
        avatar: this.avatar
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn:process.env.ACCESS_TOKEN_EXPIREY})
    return this.accessToken
}


userSchema.methods.genreateRefreshToken = async function () {
    this.refreshToken =  jwt.sign({
        id: this._id,
        name: this.name,
        username: this.username,
        email: this.email,
        avatar: this.avatar
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn:process.env.REFRESH_TOKEN_EXPIREY})
    return this.refreshToken
}

const User = model('user', userSchema)

export default User;