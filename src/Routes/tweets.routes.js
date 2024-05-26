import { Router } from "express";
import { getTweets, createTweet, liked, unliked, reply } from '../controllers/tweet.js'
import verifyToken from "../middleware/verfiyuser.js";
const tweets = Router


tweets.route('/').get(getTweets)
tweets.route('/').post(verifyToken,createTweet)
tweets.route('/:id/like').put(verifyToken,liked)
tweets.route('/:id/unlike').put(verifyToken,unliked)
tweets.route('/:id/reply').put(verifyToken,reply)

export default tweets;