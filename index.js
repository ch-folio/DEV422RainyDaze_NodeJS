
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect('mongodb+srv://elmiUser:Amina@cluster0.fh0dilb.mongodb.net/Ecommerce?retryWrites=true&w=majority').then(() => {
    console.log('Connected to Mongodb');
}).catch((err) => {
    console.log(err)
})
const app = express();
app.listen(3000, () => {
    console.log("Server is running !!!");
});

