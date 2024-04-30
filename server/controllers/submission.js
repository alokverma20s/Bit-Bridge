import Submission from "../models/submissions.js";
import Problem from "../models/Problem.js";
import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const runCode = async (req, res) => {
  const { user, problem, version, contest, sourceCode, language } = req.body;

  try {
    if(!user || !problem || !sourceCode || !language){
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    // console.log(problem);

    const testcases = await Problem.findById(problem, {testcases:true});

    const stdin = prepareTestcases(testcases.testcases);
    const stdOutput = prepareOutput(testcases.testcases);
    

    const result = await checkResult(language, version, sourceCode, stdin);
    console.log(result);

    let status = "Rejected";

    console.log(result?.stdout === stdOutput, result?.stdout, stdOutput);

    if(result?.stdout === stdOutput && result?.stderr === ""){
      status = "Accepted";
      console.log("Accepted");
    }
    else{
      console.log("Rejected");
    }

    if(status === 'Rejected'){
      if(result?.stdout != stdOutput){
        return res.status(200).json({
          success: true,
          status,
          expectedOutput: stdOutput,
          yourOutput: result.stdout || "compilation error",
          message: "Submission created successfully"
        })
      }
      else{
        return res.status(200).json({
          success: true,
          status,
          error: result,
          message:"Complilation Error"
        })
        
      }
    }

    // console.log(submission);
    return res.status(201).json({
      success: true,
      status,
      message: "Submission created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while creating submission.",
    });
  }
};
const prepareTestcases = (testcases) => {
  // console.log(testcases);
  let allTestcase = "";
  allTestcase += (testcases.length + "\n");
  testcases.forEach((testcase) => {
    allTestcase += `${testcase.input}\n`;
  });
  return allTestcase;
}
const prepareOutput = (testcases) => {
  // console.log(testcases);
  let allTestcase = "";
  testcases.forEach((testcase) => {
    allTestcase += `${testcase.output}\n`;
  });
  return allTestcase;
}
const checkResult = async (language, version, sourceCode, stdin)=>{
  // console.log(stdin);
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

  return data;
}

const submitCode = async (req, res) => {
  const { user, problem, version, contest, sourceCode, language } = req.body;

  try {
    if(!user || !problem || !sourceCode || !language){
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    const testcases = await Problem.findById(problem, {testcases:true});

    const stdin = prepareTestcases(testcases.testcases);
    const stdOutput = prepareOutput(testcases.testcases);
    

    const result = await checkResult(language, version, sourceCode, stdin);

    let status = "Rejected";

    if(result?.stdout === stdOutput && result?.stderr === ""){
      status = "Accepted";
    }



    const submission = await Submission.create({
      user,
      problem,
      contest,
      language,
      version,
      sourceCode,
      status,
    });

    if(status === 'Rejected'){
      if(result?.stdout != stdOutput){
        return res.status(200).json({
          success: true,
          status,
          expectedOutput: stdOutput,
          yourOutput: result.stdout || "compilation error",
          message: "Compilation Error"
        })
      }
      else{
        return res.status(200).json({
          success: true,
          status,
          error: result,
          message:"Complilation Error"
        })
        
      }
    }

    // console.log(submission);
    return res.status(201).json({
      success: true,
      status,
      message: "Submission created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while creating submission.",
    });
  }
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

export { submitCode, runCode, getSubmission, getSubmissionById };
