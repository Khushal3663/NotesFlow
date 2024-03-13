
import { generateAuthToken } from "../auth/auth.user.js";
import { User } from "../models/users.models.js"
import bcrypt from 'bcrypt';






export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:error});
    }
}

// post user

export const createUser = async (req, res) => {
    try {
        const newUser =  req.body;
        
        // checking whether username already exists?

        const anyUser = await User.findOne({username:newUser.username});
        if(anyUser){
            res.status(409).json({message:"Username already exist"});
        }
        else{
            // encrypting password
            newUser.password = await bcrypt.hash(newUser.password, 10);
            const user = new User(newUser);
            await user.save();
        
            res.status(200).json({message:"user created"})
        }
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const loginUser= async (req, res)=>{
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username: username});

        if(!user){
            res.status(409).json({message:"Username is incorrect"});
        }else{
            // matching login password with user's password.

            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched){
            res.status(409).json({message:"Password is incorrect"})
            }
            else{

                // creating token using jwt

                const token = generateAuthToken(user);
        
                res.set('Authorization', `Bearer ${token}`);
            
                res.append('Access-Control-Expose-Headers', '*');
                res.status(200).json({message:"username found", isMatched:isMatched,token:  token})
        
            }
        }
    } catch (error) {
        res.json({error:error.message   })
    }

    
}