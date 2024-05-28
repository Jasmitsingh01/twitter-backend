import { Router } from "express";
import { getTweets, createTweet, liked, reply,DeleteTweets } from '../controller/tweet.js'
import verifyToken from "../middleware/verfiyuser.js";
import upload from "../middleware/uploadimage.js";
const tweets = Router()


tweets.route('/').get(getTweets).post(verifyToken,upload.single('image'),createTweet)
tweets.route('/:id/like').put(verifyToken,liked)




tweets.route('/:id/reply').post(verifyToken,reply)
tweets.route('/:id/delete').delete(verifyToken,DeleteTweets)

export default tweets;