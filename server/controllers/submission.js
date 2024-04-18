import mongoose, { version } from "mongoose";
import Submission from "../models/submissions.js";
import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const makeSubmission = async (req, res) => {
  const { user, problem, version, contest, sourceCode, language } = req.body;
  // console.log("user : >> ", user);
  // console.log("problem : >> ", problem);
  // console.log("contest : >> ", contest);
  // console.log("code : >> ", sourceCode);
  // console.log("language : >> ", language);
  // console.log('version :>>', version);

  try {
    if(!user || !problem || !sourceCode || !language){
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    const submission = await Submission.create({
      user,
      problem,
      contest,
      code:sourceCode,
      language,
    });

    const {run: result} = await checkResult(language, version, sourceCode);
    // console.log(result);
    return res.status(201).json({
      success: true,
      submission,
      message: "Submission created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while creating submission.",
    });
  }
};

const checkResult = async (language, version, sourceCode, stdin)=>{
  const response = await API.post("/execute", {
    language,
    version,
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin
  });
  const data =  response.data.run;

  if(data.stderr !== ''){
    return data.stderr;
  
  }
  
  
  
  
  return data;

}

const getSubmission = async (req, res) => {
  try {
    const submission = await Submission.find();
    return res.status(200).json({
      success: true,
      submission,
      message: "Submission fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while fetch submission list.",
    });
  }
};

const getSubmissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const submission = await Submission.findById(id);
    return res.status(200).json({
      success: true,
      submission,
      message: "Submission fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while fetch submission list.",
    });
  }
};

const updateSubmission = async (req, res) => {
  const { id } = req.params;
  try {
    const submission = await submissions.findById;
    And;
    Update(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      submission,
      message: "Submission updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while updating submission.",
    });
  }
};

export { makeSubmission, getSubmission, getSubmissionById, updateSubmission };
