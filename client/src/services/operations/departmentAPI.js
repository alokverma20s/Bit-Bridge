import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { departmentEndpoints } from "../apis"

const {GET_ALLDEPARTMENTS_API, GET_DEPARTMENT_API, ADD_DEPARTMENT_API} = departmentEndpoints;

export function getDepartments(setLoading, setDepartments){
    return async (dispatch) =>{
        try {
            setLoading(true);
            const response = await apiConnector("GET", GET_ALLDEPARTMENTS_API);
            // console.log(response.data);
            if(!response.data.status){
                throw new Error(response.data.message);
            }
            const b = response.data.departmentDetails;
            // console.log(b);
    
            b.sort((a, b)=>{
                const nameA = a.departmentName.toUpperCase();
                const nameB = b.departmentName.toUpperCase();
    
                if(nameA < nameB){
                    return -1;
                }
                if(nameA > nameB){
                    return 1;
                }
                return 0;
            });
            setDepartments(b);
            setLoading(false);
            // toast.success("Fetched Successfully...");
        } catch (error) {
            toast.error("Unable to fetch departments");
        }
    }
}

export function getSubjectByDepartment(setLoading, setSubjects, departmentId, setCurrentDept){
    return async (dispatch) => {
        setLoading(true);
        try {
            console.log("hello");
            const response = await apiConnector("GET", GET_DEPARTMENT_API+departmentId);
            console.log(response.data.department.subjects);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setSubjects(response.data.department.subjects);
            setCurrentDept(response.data.department.departmentName);
            setLoading(false);
            // toast.success("Fetched Successfully...");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


export function addDepartment(departmentName){
    return async (dispatch) => {
        try {
            const response = await apiConnector("POST", ADD_DEPARTMENT_API, {departmentName});
            if(!response.data.success){
                throw new Error(response?.data?.message)
            }
            // setTempDesc(tagDescription);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong....");
        }
    }
}

