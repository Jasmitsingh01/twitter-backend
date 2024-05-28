import {v2 as cloudinary} from 'cloudinary';
import ERROR from './ERRORREPOSE.js';  
import dotenv from  'dotenv' 

dotenv.config({
    path:'../../.env'
}) 
cloudinary.config({ 
  cloud_name: 'ddhame7f7', 
  api_key: '412458718625683', 
  api_secret: 'gfFsXjRbd4GNRLQEX_Wy_8Pw8UY' 
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