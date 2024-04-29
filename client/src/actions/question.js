import * as api from '../api'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.postQuestion(questionData)
        dispatch({type: "POST_QUESTION", payload: data})
        navigate('/Questions')
    } catch (error) {
        console.log(error);
    }
}

export const fetchAllQuestions = (keyword="", sortingCriteria="upvotes", page="1") => async (dispatch) =>{
    // console.log("data Fetched");
    try {
        const {data} = await api.getAllQuestions(keyword, sortingCriteria, page);
        dispatch({ type: 'FETCH_ALL_QUESTIONS', payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const deleteQuestion = (id, navigate) => async (dispatch) =>{
    try {
        await api.deleteQuestion(id);
        dispatch(fetchAllQuestions());
        navigate(-1);
    } catch (error) {
        console.log(error);
    }
}
export const voteQuestion = (id, value, userId)=> async (dispatch)=>{
    try {
        await api.voteQuestion(id, value, userId);
        dispatch(fetchAllQuestions());

    } catch (error) {
        console.log(error);
    }
}  

export const postAnswer = (formData, id, navigate) => async (dispatch) =>{
    try{
        // const {noOfAnswers, answerBody, userAnswered, userId} = formData;
        console.log(formData);
        const {data} = await api.postAnswer(formData, id);
        dispatch({type: 'POST_ANSWER', payload: data});
        dispatch(fetchAllQuestions())
    }catch(error){
        console.log(error);
    }
}

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch)=>{
    try {
        await api.deleteAnswer(id, answerId, noOfAnswers);
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error);
    }
}


export const voteAnswer = (id, answerId, value, userId)=> async (dispatch)=>{
    try {
        await api.voteAnswer(id, answerId, value, userId);
        dispatch(fetchAllQuestions());

    } catch (error) {
        console.log(error);
    }
}  