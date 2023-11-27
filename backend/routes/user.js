import {Router} from 'express'
import User from "../schemas/userSchema.js"
import bcrypt from 'bcrypt'
const router=Router();

router.post('/register', async(req,res) =>{
    try{
        
        const{ email,password} = req.body
        let user = await User.findOne({email:email})
        if(user){
            return res.status(400).json({message: "Email already exists"})
        }
        const hash = await bcrypt.hash(password, 20);
        user=new User({email,password : hash})
        await user.save()
        res.status(201).json({ message: 'User registered successfully' });
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
            return res.status(400).json({message: "User not found"})
        }
        if(!bcrypt.compare(password, user.password)){
            return res.status(400).json({message: "Incorect password"})
        }
        res.status(201).json({ message: 'User registered successfully' });
    }catch(error){
        console.log(error)
        return res.status(400).json(error)
    }
})


export default router;