import mongoose from 'mongoose';
import ERROR from '../../src/utils/ERRORREPOSE.js';



async function connectionDataBase(){
    try {
       const connect= await mongoose.connect(process.env.DATABASE_URL)
       if(!connect) throw new ERROR('Could not connect to database',500)
       console.log('DATA BASE NAME AND URUL ','\nDB Name :- '+connect.connection.db.databaseName,'\nDB URL :- '+connect.connection.host )
    } catch (error) {
        console.log(error)
    }
}



export default connectionDataBase;