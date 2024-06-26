import axios from 'axios'
const backend_URL = process.env.REACT_APP_BASE_URL;

const API = axios.create({baseURL: backend_URL});

export const logIn = (authData) => API.post('user/login', authData);
export const signUp = (authData) => API.post('user/signup', authData);

export const postQuestion = (questionData) => API.post('questions/Ask', questionData);
export const getAllQuestions = (keyword, sortingCriteria, page) => API.get(`/questions/get?keyword=${keyword}&sortingcriteria=${sortingCriteria}&page=${page}`);
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, {value, userId})

export const postAnswer = (formData, id) => API.patch(`/answer/post/${id}`, formData);
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, {id, answerId, noOfAnswers});
export const voteAnswer = (id, answerId, value, userId) => API.patch(`/answer/vote/${id}`, {value, userId, answerId})

export const fetchAllUsers = () => API.get('/user/getAllUsers');
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData);

export const postQuiz = (quizData) => API.post('quiz/createQuiz', quizData);
// export const postQuizQuestions = (quizQuestionData) => API.post('quiz/createQuizQuestion', quizQuestionData);
export const fetchAllQuiz = () => API.get('quiz/getAllQuiz');
export const submitQuizapi = (quizData) => API.post('quiz/submitQuiz', quizData);

export const fetchAllSubject = () => API.get('/subject/getSubjects');
