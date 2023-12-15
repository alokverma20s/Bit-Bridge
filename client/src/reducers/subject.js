const subjectReducer = (state = {data: null}, action)=>{
    switch (action.type) {
        case "FETCH_ALL_SUBJECTS":
            return {...state, data: action.payload}
        default:
            return state;
    }
}


export default subjectReducer