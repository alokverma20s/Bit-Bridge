import axios from 'axios'
import { backend_URL } from './url';

const API = axios.create({baseURL: backend_URL});

export const logIn = (authData) => API.post('user/login', authData);
export const signUp = (authData) => API.post('user/signup', authData);

export const postQuestion = (questionData) => API.post('questions/Ask', questionData);
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, {value, userId})

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, {noOfAnswers, answerBody, userAnswered, userId});
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, {id, answerId, noOfAnswers});

export const fetchAllUsers = () => API.get('/user/getAllUsers');
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData);

export const postQuiz = (quizData) => API.post('quiz/createQuiz', quizData);
// export const postQuizQuestions = (quizQuestionData) => API.post('quiz/createQuizQuestion', quizQuestionData);
export const fetchAllQuiz = () => API.get('quiz/getAllQuiz');
export const submitQuizapi = (quizData) => API.post('quiz/submitQuiz', quizData);

export const fetchAllSubject = () => API.get('/subject/getSubjects');
