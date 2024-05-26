import mongoose from 'mongoose';


async function connectionDataBase(){
    try {
       const connect= await mongoose.connect(process.env.DATABASE_URL)
    } catch (error) {
        console.log(error)
    }
}



export default connectionDataBase;