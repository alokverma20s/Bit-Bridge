import { apiConnector } from "../apiConnector";
import toast from 'react-hot-toast'
import { resourceEndPoints } from "../apis";

export function addResource(subjectId, formData, config, setUploading, toast){
    return async(dispatch)=>{
        try{
            const response = await apiConnector("POST", resourceEndPoints.POST_API+subjectId, formData, config);
            if(!response.data.success)
                throw new Error(response?.data?.message);
            setUploading(false);
            toast.success("File uploaded successfully");

        }catch(e){
            console.log(e.message);
            toast.error("Something went wrong");
        }
    }
}

export function getAllResources(subjectId, setLoading, setResources, setSubjectName) {
    return async(dispatch)=>{
        try{
            const response = await apiConnector("GET", resourceEndPoints.GET_ALL_RESOURCES+subjectId, {subjectId});
            if(!response.data.success)
                throw new Error(response?.data?.message);
            setResources(response?.data?.resources);
            setSubjectName(response?.data?.subjectName?.subjectName);
            console.log(response?.data);
            setLoading(false);
        }catch(e){
            console.log(e.message);
            toast.error("Something went wrong");
        }
    }
}