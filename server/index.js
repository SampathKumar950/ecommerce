import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
connectDB();
app.listen(3000,()=>{
    console.log("listening...");
})