import mongoose from "mongoose"
import users from '../models/auth.js';

export const getPendingInstructor = async (req, res) =>{
    try{
        const data = await users.find({approved: false},{
            name: true,
            email: true,
            joinedOn: true,
        });
        return res.status(200).json({
            success: true,
            data,
            message: "fetched Successfully",
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong, while fetch users list."
        })
    }
}
export const acceptInstrut = async (req, res) =>{
    const {_id} = req.body;
    try{
        const data = await users.findByIdAndUpdate(_id, {
            approved: true,
            role: 'instructor'
        },{new: true});
        return res.status(200).json({
            success: true,
            data,
            message: "Accepted Successfully",
        })
        
    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong, while fetch users list."
        })
    }
}
export const rejectInstrut = async (req, res) =>{
    const {_id} = req.body;
    try{
        const data = await users.findByIdAndUpdate(_id, {
            approved: true,
            role: 'student'
        },{new: true});
        return res.status(200).json({
            success: true,
            data,
            message: "Rejected Successfully",
        })
        
    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong, while fetch users list."
        })
    }
}