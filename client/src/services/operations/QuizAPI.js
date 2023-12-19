import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { quizEndpoints } from "../apis";

const { GET_QUIZ_API, DELETE_QUIZ_API} = quizEndpoints;
export function getQuizById(setLoading, setCurrentQuiz, quizId){
    return async (dispatch)=>{
        setLoading(true);
        try {
            // console.log(GET_QUIZ_API+quizId);
            const response = await apiConnector("GET", GET_QUIZ_API+quizId);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setCurrentQuiz(response.data.quiz);
            setLoading(false);
            // toast.success("Quiz fetched Successfully...")
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
}

export function deleteQuiz(quizId, navigate){
    return async (dispatch)=>{
        try {
            const response = await apiConnector("GET", DELETE_QUIZ_API+quizId);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            navigate(0);
            toast.success("Quiz Deleted Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}