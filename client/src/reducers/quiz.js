const quizReducer = (state = {data: null}, action)=>{
    switch (action.type) {
        case "POST_QUIZ":
            return {...state }
        case "FETCH_ALL_QUIZ":
            {
                return {...state, data: action.payload}
            }
        case "SUBMIT_QUIZ":
            return {...state}    
        default:
            return state;
    }
}


export default quizReducer