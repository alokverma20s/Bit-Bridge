import mongoose, { model } from "mongoose";

const resourceSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    pdfFile:{
        type: File,
    },
    type: {
        type: String,
    },
    uploadedOn:{
        type: Date,
        default: new Date(Date.now())
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

});

export default mongoose.model("Resource", resourceSchema);