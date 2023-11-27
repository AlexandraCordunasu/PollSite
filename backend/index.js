import userRoute from './routes/user.js'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'


const app = express();
app.use(cors());
app.use(express.json());
app.use('/user',userRoute);


mongoose.connect('mongodb://127.0.0.1:27017/ProbaIT')


app.listen(3001,() => {
    console.log("Server is running")
})


