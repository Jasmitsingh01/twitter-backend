import Tweet from "../models/tweet.model.js";
import APIRESPONSE from "../utils/APIRESPONSE.js";
import { AYSNCHANDLER } from "../utils/AYSNCHANDLER.js";
import UploadToCloud from "../utils/COULDNARY.js";
import ERROR from "../utils/ERRORREPOSE.js";


const getTweets = AYSNCHANDLER(async ( req , res , next ) =>{
    try {
        const tweets = await Tweet.find().populate({
            path:'TweetBy',
            select:'username name  avatar _id '
        }).populate({
            path:'likeby',
            select:'-password -accessToken -refreshToken  -email -updatedAt'
        })
        .populate({
            path:'reply',
            select:'username name  avatar '        })
        if(!tweets) throw new ERROR("Tweets not found " ,501)
     res.status(200).send(
            new APIRESPONSE(200,"Tweets",tweets)
        )

    } catch (error) {

        console.error(error)
      
        res.status(error?.statusCode).send(
            new APIRESPONSE(error?.statusCode, error?.message, null)

        )
        
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
         res.status(201).send(
            new APIRESPONSE(201,'Tweets successfully created','')
        )

    } catch (error) {

        console.error(error)
    res.status(error?.statusCode).send(
        new APIRESPONSE(error?.statusCode, error?.message, null)

    )        
    }
})
const liked = AYSNCHANDLER(async(req, res, next)=>{
    try {
        const {id}=req.params
        const{_id}=req;
        const tweet=await Tweet.findById(id)
        if(!tweet) throw new ERROR("Tweets not found " ,501)
       if(tweet.likeby?.find((likeby)=>likeby==_id)){
        tweet.likeby.pull(_id)
       }
       else{
        tweet.likeby.push(req._id)

       }
         const data=await tweet.save()
         if(!data) throw new ERROR("Tweets liked is not updated " ,501)
        res.status(200).send(
            new APIRESPONSE(200,'Tweets successfully liked')
        )
        


    } catch (error) {

        console.error(error)
        res.status(error?.statusCode).send(
            new APIRESPONSE(error?.statusCode, error?.message, null)
    
        )        
        }
})



const reply = AYSNCHANDLER(async(req, res, next)=>{
    try {
        const {id}=req.params
        const{content}=req.body
        if(!content) throw new ERROR("Please fill all fields",400)
        
         const tweet=await Tweet.findById(id)
         if(!tweet) throw new ERROR("Tweets not found " ,501)
        const newtweet = await Tweet({content: content,TweetBy:req._id})
         if(!newtweet) throw new ERROR(" tweet not found", 400)
         const created = await newtweet.save()
         if(!created) throw new ERROR(" something went wrong", 500)    
        
        tweet.reply.push(newtweet._id)

        tweet.save()
        res.status(200).send(
            new APIRESPONSE(200,'Tweets successfully reply','')
        )


    } catch (error) {

        console.error(error)
        res.status(error?.statusCode).send(
            new APIRESPONSE(error?.statusCode, error?.message, null)
    
        ) 
        
    }
})

const DeleteTweets=AYSNCHANDLER(async(req, res) => {
    try {
        const { id } = req.params;
        const tweet =await Tweet.findById(id);
        if(!tweet) throw new ERROR('Tweets not found',400)
        if(!tweet?.TweetBy==req._id){
            throw new ERROR('Permission denied',502)
        }
        const deleted = await Tweet.findByIdAndDelete(id);
        if(!deleted) throw new ERROR('Tweets not found',400)
            res.status(200).send(
            new APIRESPONSE(200,'Tweets successfully deleted','')
        )
    } catch (error) {
        console.error(error)
        res.status(error?.statusCode).send(
            new APIRESPONSE(error?.statusCode, error?.message, null)
    
        ) 
        
    }
})

const allbyuser=AYSNCHANDLER(async(req, res, next)=>{
    try {
       const {id}=req.query;
       if(id){
        req._id=id;
       }
        const tweet=await Tweet.find({TweetBy:req._id}).populate({
            path:'TweetBy',
            select:'username name  avatar '
        }).populate({
            path:'likeby',
            select:'-password -accessToken -refreshToken  -email -updatedAt'
        })
        if(!tweet) throw new ERROR("Tweets not found " ,501)
        res.status(200).send(
            new APIRESPONSE(200,"Tweets",tweet)
        )

    } catch (error) {

        console.error(error)
        res.status(error?.statusCode).send(
            new APIRESPONSE(error?.statusCode, error?.message, null)
    
        )        
    }
})

 export { reply , liked ,createTweet ,getTweets,DeleteTweets,allbyuser}
