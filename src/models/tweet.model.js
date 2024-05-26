import {Schema,Types,model} from 'mongoose'

const Tweets = new Schema({
    content:{
        type:String,
        required:true
    },
    TweetBy:{
        type:Types.ObjectId,
        ref:'users'
    },
    likeby:{
        type:[Types.ObjectId],
        ref:'users'
    },
    reply:{
        type:[Types.ObjectId],
        ref:'tweets'
    }
    ,
    image:{
        type:String,
    }
},{
    timestamps:true
})

const Tweet = model('tweets',Tweets)

export default Tweet;