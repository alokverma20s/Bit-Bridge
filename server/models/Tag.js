import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
    tagName: {
        type: String,
    },
    question:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Queston"
        }
    ],
    tagDescription:{
        type: String,
    }
})

export default mongoose.model("Tag", tagSchema);