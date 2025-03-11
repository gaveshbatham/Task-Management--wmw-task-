import mongoose from 'mongoose';

const connectDB = async ()=>{

    try{
        const conn = await mongoose.connect(process.env.DB_LINK)

        console.log(`MongoDB database Connected `);
    }catch(err){
        console.error(`Error: ${err.message}`);
    }

} 

export default connectDB;