import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { resultEndpoints } from "../apis";

const {QUIZ_RESULT_API, QUIZZES_API, GET_MY_RESULT_API} = resultEndpoints;

export function fetchQuizResults(setLoading, setParticipants,setQuizData,userid,quizid){
    return async (dispatch) =>{
        setLoading(true);
        try {
            const response = await apiConnector("POST", QUIZ_RESULT_API,{quizid : quizid, userid: userid});

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setParticipants(response.data.quiz?.user);
            setQuizData(response.data.quiz);
            setLoading(false);
            // toast.success("Fetched Successfully....");
        } catch (error) {
            toast.error(error.message);
        }
    }
}

export function quizzes(setLoading, setQuizes, userid){
    return async (dispatch) =>{
        setLoading(true);
        try {
            const response = await apiConnector("GET", QUIZZES_API+userid);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setQuizes(response.data.quiz);
            setLoading(false);
            // toast.success("Result fetched Successfully.");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }
}

export function getMyResult(setLoading, setQuizes, userid){
    return async (dispatch)=>{
        setLoading(true);
        try {
            const response = await apiConnector("GET", GET_MY_RESULT_API+userid);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setQuizes(response.data.data.result);
            setLoading(false);
            // toast.success("Your result fetched successfully...")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}