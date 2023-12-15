import * as api from '../api'

export const fetchAllSubjects = () => async (dispatch) =>{
    try {
        const {data} = await api.fetchAllSubject();
        dispatch({type: "FETCH_ALL_SUBJECTS", payload: data})
        // console.log("data Fetched");
    } catch (error) {
        console.log(error);
        console.log("data not fetched");
    }
}