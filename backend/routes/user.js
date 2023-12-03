import {Router} from 'express'
import User from "../schemas/userSchema.js"
import bcrypt, { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from'dotenv'


const router=Router();

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
router.post('/register', async(req,res) =>{
    try{
        const{ email,password} = req.body
        let user = await User.findOne({email:email})
        if(user){
            return res.status(400).json({message: "Email already exists", errorType: 'emailused'})
        }
        const hash = await bcrypt.hash(password, 20);
        user=new User({email,password : hash})
        await user.save()
        return res.status(201).json({ message: 'User registered successfully' });
    }catch(error){
        console.log(error)
        return res.status(400).json(error)
    }
})

router.post('/login', async(req,res) =>{
    try{
        const{ email,password} = req.body
        let user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({message: "User not found", errorType: 'noUser'})
        }
        if(!await(bcrypt.compare(password, user.password))){
            return res.status(400).json({message: "Incorect password", errorType: 'wrongPass'})
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, { expiresIn: '24h' });
        res.status(201).json({ message: 'Login successfully',token });
    }catch(error){
        console.log(error)
        return res.status(400).json(error)
    }
})


export default router;