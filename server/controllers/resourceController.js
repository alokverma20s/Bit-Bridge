import Subject from "../models/subjects.js";
import Resource from "../models/resourceModel.js";

import cloudinary from 'cloudinary';


async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder }
    options.resource_type = "auto";
    if (quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.path, options);
};


export const addResource = async (req, res) => {
    try {
        console.log(req);
        const { resourceName, description, authorId, subjectId, userId } = req.body;
        const file = req.file;

        if(!file || !resourceName || !authorId || !subjectId || !userId) {
            return res.status(403).json({
                success: false, message: "Incomplete fields"
            })
        }

        const response = await uploadFileToCloudinary(file, "Folder1");

        const newResource = await Resource.create({ resourceName, description, author: authorId, subject: subjectId, pdfFileURL: response.secure_url, page: response.pages, originalName: response.original_filename });
        await Subject.findByIdAndUpdate(subjectId, {
            $push: {
                resources: newResource._id
            }
        })

        res.status(200).json({
            success: true, message: "Resource added successfully"
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}



export const getAllResources = async (req, res) => {
    const { subjectId } = req.params;
    try {
        if (!subjectId) {
            return res.status(404).json({
                success: false,
                message: "Resource not found"
            })
        }
        console.log(subjectId);
        const resources = await Resource.find({ subject: subjectId }).populate("subject", { subjectName: true }).populate("author", { name: true });
        const subjectName = await Subject.findById(subjectId);
        if (!subjectId) {
            return res.status(404).json({
                success: false,
                message: "No resources found"
            })
        }
        res.status(200).json({
            success: true,
            resources: resources,
            subjectName
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
