import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbconfig.js";
import userRouter from "./routes/user.routes.js";
import dsatopicRouter from "./routes/DsaTopicRoutes.js"
import cors from "cors"
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
await connectDB();
app.use("/",userRouter);
app.use("/",dsatopicRouter);
app.listen(process.env.port,()=>{
    console.log(`server running on portNo. ${process.env.port}`);
})
