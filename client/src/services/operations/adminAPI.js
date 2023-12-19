import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { adminEndPoints } from "../apis";

const {GET_PENDING_INSTRUCTOR_API,
    ACCEPT_INSTRUCTOR_API,
    REJECT_INSTRUCTOR_API
} = adminEndPoints;

export function getPendingInstructor(setLoading, setUsers){
    return async (dispatch)=>{
        try{
            setLoading(true);
            const response = await apiConnector("GET", GET_PENDING_INSTRUCTOR_API);
            
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            setUsers(response.data.data);
            setLoading(false);
            // toast.success("Pending request fetched successfully.")
        }catch(error){
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
}

export function acceptInstrut(id){
    return async (dispatch)=>{
        try {
            const { data } = await apiConnector("POST", ACCEPT_INSTRUCTOR_API,{
                _id: id
            });
            if(!data){
                throw new Error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    }
}
export function rejectInstrut(id){
    return async (dispatch)=>{
        try {
            const { data } = await apiConnector("POST", REJECT_INSTRUCTOR_API,{
                _id: id
            });
            if(!data){
                throw new Error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    }
}