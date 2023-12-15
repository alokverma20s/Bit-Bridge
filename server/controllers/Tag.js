import Tag from "../models/Tag.js";

export const addTagDescription = async (req, res) =>{
    try {
        const {tagDescription, tagId} = req.body;
        if(!tagDescription || !tagId){
            return res.status(403).json({
                success: false,
                message: "Tag Description and Tag Id both are required."
            })
        }
        await Tag.findByIdAndUpdate(tagId, {tagDescription});
        return res.status(200).json({
            success: true,
            message: "Description added successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, while Adding tag description."
        })
    }
}

export const getQuestionByTagName = async (req, res) =>{
    try {
        const {tagId} = req.params;
        if(!tagId){
            return res.status(403).json({
                success: false,
                message: "Tag id is required."
            })
        }
        const tagQuestion = await Tag.findById(tagId).populate({
            path: "question",
            populate:{
                path: "questionTags",
            },
        }).populate({
            path:"question",
            populate:{
                path: "userId",
                select:{role:true, name: true}
            }
        }).populate({
            path:"question",
            populate:{
                path: "answer.userId",
                select:{role:true, name: true}
            }
        })

        return res.status(200).json({
            success : true,
            message: "Fetched successfully.",
            data: tagQuestion
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, while fetching tag Question."
        })
    }
}

export const getTags = async (req, res) =>{
    try {
        const tags = await Tag.find({}, {tagName: true, tagDescription: true});
        return res.status(200).json({
            success: true,
            message: "Fetched successfully.",
            data: tags
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, while fetching tags."
        })
    }
}