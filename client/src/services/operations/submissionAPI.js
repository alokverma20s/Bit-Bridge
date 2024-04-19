import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { submissionEndPoints } from "../apis";

const  { CREATE_SUBMISSION_API, GET_SUBMISSION_API, GET_SUBMISSION_BY_ID_API } = submissionEndPoints;

export function createSubmission(setLoading, submissionData){
    return async (dispatch) => {
        setLoading(true);
        try {
            console.log(submissionData);
            const response = await apiConnector("POST", CREATE_SUBMISSION_API, submissionData);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setLoading(false);
            toast.success("Submission Created Successfully...");
        } catch (error) {
            toast.error("Unable to create Submission");
        }
    }
}

export function getSubmissionList(setLoading, setSubmissions){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("GET", GET_SUBMISSION_API);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setSubmissions(response.data.submission);
            setLoading(false);
            toast.success("Fetched Successfully...");
        } catch (error) {
            toast.error("Unable to fetch Submissions");
        }
    }
}
