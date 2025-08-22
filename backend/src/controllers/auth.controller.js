// a controller is a component that acts as the primary decision-maker for handling incoming client requests.

import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

//Model-View-Controller (MVC) architectural pattern. It sits between the incoming request and your application's business logic and data.
export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try{

        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }


        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 Characters"});
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({ message: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new user({
            email,
            fullName,
            password: hashedPassword
        })

        if(newUser){
            generateToken(newUser._id);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
            
        }else{
            res.status(400).json({
                message: " Invalid User",
            })
        }
        
    }catch(err){
        console.log(`Error in signup controller ${err.message}`)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }

};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        // frind user in db
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({
                message: "Invalid credtionals",
            })
        }

        const isPassCorrect = await bcrypt.compare(password, user.password);
        if(!isPassCorrect){
            res.status(400).json({
                message: "Invalid credtionals",
            })    
        }

        generateToken(user._id, res);
        res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })        
    }catch(err){
        console.log(`Error in login controller ${err.message}`)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
};

export const logout = (req, res) => {

    try{
        res.cookie("JWT", "", {maxAge: 0 });
        res.status(200).json({message: "Logged out successfully"})
    } catch(err){
        console.log(`Error in login controller ${err.message}`)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
};
