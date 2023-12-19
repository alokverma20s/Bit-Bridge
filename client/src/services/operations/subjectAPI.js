import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { subjectEndpoints } from "../apis"

const {GET_API, GETQUESTIONS_API} = subjectEndpoints;

export function getSubjects(setLoading, setSubjects){
    return async (dispatch) =>{
        try {
            setLoading(true);
            const response = await apiConnector("GET", GET_API);
    
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            const b = response.data.data;
    
            b.sort((a, b)=>{
                const nameA = a.subjectName.toUpperCase();
                const nameB = b.subjectName.toUpperCase();
    
                if(nameA < nameB){
                    return -1;
                }
                if(nameA > nameB){
                    return 1;
                }
                return 0;
            });
            setSubjects(b);
            setLoading(false);
            // toast.success("Fetched Successfully...");
        } catch (error) {
            toast.error("Unable to fetch Questions");
        }
    }
}

export function getQuestionsBySubject(setLoading, setSubjects, subjectId){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("GET", GETQUESTIONS_API+subjectId);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setSubjects(response.data.questions);
            setLoading(false);
            // toast.success("Fetched Successfully...");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

