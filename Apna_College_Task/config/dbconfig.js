import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

export const connectDB = async()=>{
   try{
       mongoose.connect(process.env.mongodburl)
       console.log("MongoDB Connected");
   }
   catch(err){
      console.log("mongodb not connected ");
      process.exit(1);
   }
}
