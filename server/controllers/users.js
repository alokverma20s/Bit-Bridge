import mongoose from 'mongoose'
import User from '../models/auth.js'

export const getAllUsers = async (req, res) =>{
    try {
        const allUsers = await User.find({},{
            name: true,
            email: true,
            joinedOn: true,
            role: true,
            about: true,
            tags: true,
        })
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({message: error.message });
    }
}

export const updateProfile = async (req, res) =>{
    const {id: _id } = req.params;
    const {name, about, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('User unavailable...')
    }
    try {
        const updateProfile = await User.findByIdAndUpdate(_id, {$set: {'name': name, 'about': about, 'tags': tags}}, {new: true})
        res.status(200).json(updateProfile)

    } catch (error) {
        res.status(405).json({message: error.message})
    }
}