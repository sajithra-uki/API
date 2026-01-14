import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT 
const mongoURL = process.env.MONGOURL;


app.use(express.json());
app.use(bodyParser.json());
app.use("/",async(requestAnimationFrame,res))


mongoose.connect(mongoURL).then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(`Database connection failed: ${error}`);
});
