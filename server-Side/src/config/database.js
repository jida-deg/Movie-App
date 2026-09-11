import mongoose from "mongoose";
const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoDb connected successfully")
    }
    catch(error){
        console.log("MongoDB connection is failed",error.message)
        process.exit(1)
    }
}

export default connectDB

