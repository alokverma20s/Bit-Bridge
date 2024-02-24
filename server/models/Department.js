import mongoose from "mongoose";

const DepartmentSchema = mongoose.Schema({
    departmentName: {type: String, required: true},
    subjects: [{type: mongoose.Schema.Types.ObjectId, ref: "Subject"}],
    
})

export default mongoose.model("Department", DepartmentSchema);
