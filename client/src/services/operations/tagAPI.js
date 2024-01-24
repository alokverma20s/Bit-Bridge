import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { tagEndpoints } from "../apis";

const { GET_API, GETQUESTIONS_API, ADD_DESC_API } = tagEndpoints;

export function getTags(setLoading, setTagsList) {
    return async (dispatch) =>{
        setLoading(true);
        try {
            const response = await apiConnector("GET", GET_API);

            if(!response.data.success){
                throw new Error(response?.data?.message)
            }
            setTagsList(response.data.data);
            setLoading(false);
        } catch (error) {
            toast.error("Unable to fetch tag...");
        }
        // toast.success("Tags are fetched Successfully.")
    }
}


export function getTagsData(setLoading, setTagData, tagId){
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector("GET", GETQUESTIONS_API+tagId);
            if(!response.data.success){
                throw new Error(response?.data?.message)
            }
            setTagData(response.data.data);
            setLoading(false);
        } catch (error) {
            toast.error("Something went wrong....");
        }
    }
}
export function addDesc(tagDescription, tagId,setTempDesc){
    return async (dispatch) => {
        try {
            const response = await apiConnector("POST", ADD_DESC_API, {tagDescription, tagId});
            if(!response.data.success){
                throw new Error(response?.data?.message)
            }
            setTempDesc(tagDescription);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong....");
        }
    }
}

