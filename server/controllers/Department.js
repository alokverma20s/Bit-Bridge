import Department from "../models/Department.js";

export const addDepartment = async (req, res) => {
  const { departmentName } = req.body;
  try {
    if (!departmentName) {
      return res.status(403).json({
        success: false,
        message: "Subject Name is required.",
      });
    }
    await Department.create({ departmentName });
    return res.status(200).json({
      success: true,
      message: "Department created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, while creating department.",
    });
  }
};

export const getAllDepartment = async (req, res) => {
  try {
    const departmentDetails = await Department.find();
    res.status(200).json({
      departmentDetails,
      status: true,
      message: "Department fetched Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, while fetching department.",
    });
  }
};

export const getDepartment = async (req, res) => {
    const {id} = req.params;
    if(!id)
    return res.status(404).json({
        success: false,
        message: "Department id is required"
    })
    try {
        const department = await Department.findById(id).populate({
            path: "subjects",
            select: {subjectName: true, semester: true, subjectDescription: true}
        });

        res.status(200).json({
            department,
            success: true,
            message: "Department fetched Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, while fetching department with id "+id,
          });
    }
};
