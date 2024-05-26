import {v2 as cloudinary} from 'cloudinary';
import ERROR from './ERRORREPOSE';  
import dotenv from  'dotenv' 

dotenv.config({
    path: "./config/*.env"
})       
cloudinary.config({ 
  cloud_name: process.env.cloudName, 
  api_key: process.env.cloudApikey, 
  api_secret: process.env.cloudApiSercet 
});

const UploadToCloud= async (filePath)=>{
    try {
    const result= await cloudinary.uploader.upload(filePath)
    if(!result) throw ERROR('Upload to cloudnary is failed',500)
    console.log(result.url);
    return result.url;

    } catch (error) {
        console.error(error)
        
        
    }

}

export default UploadToCloud;