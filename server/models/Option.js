import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    option: {
        type: String,
    }
})

export default mongoose.model("Option", optionSchema);
