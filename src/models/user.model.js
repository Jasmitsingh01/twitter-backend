import { Schema, Types, model } from 'mongoose'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    usename: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true, unique: true

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
        default: 'https://www.google.com/imgres?q=user%20icon&imgurl=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fdefault-avatar-profile-icon-vector-social-media-user-image-182145777.jpg&imgrefurl=https%3A%2F%2Fwww.dreamstime.com%2Fillustration%2Ficon-user.html&docid=tlvJVigiFVdDeM&tbnid=XWg4py6RDWlHNM&vet=12ahUKEwjN8rCvtKuGAxVVzjgGHbygBa8QM3oECHwQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwjN8rCvtKuGAxVVzjgGHbygBa8QM3oECHwQAA'
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
})


userSchema.on('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.genreateAccessToken = async function () {
    this.accessToken = await jwt.sign({
        id: this._id,
        name: this.name,
        username: this.username,
        email: this.email,
        avatar: this.avatar
    }, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIREY)
    return this.accessToken
}


userSchema.methods.genreateRefreshToken = async function () {
    this.refreshToken = await jwt.sign({
        id: this._id,
        name: this.name,
        username: this.username,
        email: this.email,
        avatar: this.avatar
    }, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIREY)
    return this.refreshToken
}

const User = model('users', userSchema)

export default User;