import Tweet from "../models/tweet.model.js";
import APIRESPONSE from "../utils/APIRESPONSE.js";
import { AYSNCHANDLER } from "../utils/AYSNCHANDLER.js";
import UploadToCloud from "../utils/COULDNARY.js";
import ERROR from "../utils/ERRORREPOSE.js";


const getTweets = AYSNCHANDLER(async ( req , res , next ) =>{
    try {
        const tweets = await Tweet.find().populate('user')
        if(!tweets) throw new ERROR("Tweets not found " ,501)
        new APIRESPONSE(200,'Tweets successfully retrieved', tweets,res)


    } catch (error) {

        console.error(error)
        new APIRESPONSE(error?.statusCode, error?.message, null,res)
        
    }
})



const createTweet = AYSNCHANDLER(async ( req , res , next ) =>{
    try {
        const {content}=req.body
        const {file}=req
        if(!content) throw new ERROR("Please fill all fields",400)
        const ImageUrl = await UploadToCloud(file?.path)
        const tweet = await Tweet.create({content,image:ImageUrl,TweetBy:req._id})
        if(!tweet) throw new ERROR("Tweets not found " ,501)
        new APIRESPONSE(201,'Tweets successfully created', tweet,res)


    } catch (error) {

        console.error(error)
        new APIRESPONSE(error?.statusCode, error?.message, null,res)
        
    }
})
const liked = AYSNCHANDLER(async(req, res, next)=>{
    try {
        const {id}=req.params
        const tweet=await Tweet.findById(id)
        if(!tweet) throw new ERROR("Tweets not found " ,501)
        tweet.likeby.push(req._id)
        tweet.save()
        new APIRESPONSE(201,'Tweets successfully liked', tweet,res)


    } catch (error) {

        console.error(error)
        new APIRESPONSE(error?.statusCode, error?.message, null,res)
        
    }
})


const unliked = AYSNCHANDLER(async(req, res, next)=>{
    try {
        const {id}=req.params
        const tweet=await Tweet.findById(id)
        if(!tweet) throw new ERROR("Tweets not found " ,501)
        tweet.likeby.pull(req._id)
        tweet.save()
        new APIRESPONSE(201,'Tweets successfully unliked', tweet,res)


    } catch (error) {

        console.error(error)
        new APIRESPONSE(error?.statusCode, error?.message, null,res)
        
    }
})

const reply = AYSNCHANDLER(async(req, res, next)=>{
    try {
        const {id}=req.params
        const tweet=await Tweet.findById(id)
        if(!tweet) throw new ERROR("Tweets not found " ,501)
        tweet.reply.push(id)
        tweet.save()
        new APIRESPONSE(201,'Tweets successfully replied', tweet,res)


    } catch (error) {

        console.error(error)
        new APIRESPONSE(error?.statusCode, error?.message, null,res)
        
    }
})




 export { reply , liked, unliked ,createTweet ,getTweets}
