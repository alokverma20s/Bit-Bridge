import mongoose, { model } from "mongoose";

const resourceSchema = mongoose.Schema({
    resourceName:{
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
    pdfFileURL:{
        type: String,
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