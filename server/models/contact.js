import mongoose from 'mongoose'

const contactSchema = mongoose.Schema(
    {
        _type: String,
        name: String,
        email: String,
        message: String,
    },
    { timestamps: true }
)

export default mongoose.model("Contact", contactSchema);