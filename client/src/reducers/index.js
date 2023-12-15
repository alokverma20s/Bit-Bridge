import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from './currentUser'
import questionsReducer from './questions.js'
import usersReducer from "./users";
import quizReducer from "./quiz.js";

export default combineReducers({
    authReducer, currentUserReducer, questionsReducer, usersReducer, quizReducer
})