import express from "express";
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from"../model/usermodel.js";
import dotenv from"dotenv";
dotenv.config();
import authRoutes from ("./Routes/auth.js");

Router.post("/register",async(req,res)=>{
    try{
        
        const hashedPassword =await bcrypt.hash(req.body.Password,10);

        const user =new User({
            userName :req.body.userName,
            email:req.body.email,
            Password:hashedPassword
        });
        await user.save();
        res.status(201).json("User Regester Succesfully")


    }catch(erroe){
        res.status(500).json(error.massage)
    }
});

Router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) 
            return res.status(400).json("User not found");

        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if (!validPassword) 
            return res.status(400).json("Wrong password");

        const token = jwt.sign(
            { id: user._id },
            process.env.JWTSECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            token,
            user
        });

    } catch (error) {
        res.status(500).json(error.message);
    }
});

export default Router;



