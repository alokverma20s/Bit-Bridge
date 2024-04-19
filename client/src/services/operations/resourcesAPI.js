import { apiConnector } from "../apiConnector";
import toast from 'react-hot-toast'
import { resourceEndPoints } from "../apis";

export function addResource(resourceName, description, authorId, subjectId, userId){
    return async(dispatch)=>{
        try{
            const response = await apiConnector("POST", POST_API, {resourceName, description, authorId, subjectId, userId});
            if(response.data.success)
                throw new Error(response?.data?.message);
        }catch(e){
            console.log(e.message);
            toast.error("Something went wrong");
        }
    }
}