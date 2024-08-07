const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
    SENDOTP_API: BASE_URL + "/user/sendotp",
    PROFILE_QUESTIONS_API: BASE_URL + "/user/userQuestions",
    SIGNUP_API: BASE_URL + "/user/signup",
    LOGIN_API: BASE_URL + "/user/login",
    GETALLUSER_API: BASE_URL + "/user/getAllUsers",
    UPDATEUSER_API: BASE_URL + "/user/update/id",
    CHANGEPASSWORD_API: BASE_URL + "/user/changepassword",
    RESETPASSWORDTOKEN_API: BASE_URL + "/user/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/user/reset-password",
};

export const questionEndpoints = {
    POST_API: BASE_URL + "/questions/Ask",
    GET_API: BASE_URL + "/questions/get",
    DELETE_API: BASE_URL + "/questions/delete/id",
    VOTE_API: BASE_URL + "/questions/vote/id",
    GETQUESTION_API: BASE_URL + "/questions/get/",
}

export const subjectEndpoints = {
    POST_API: BASE_URL+"/subject/addSubject",
    GET_API: BASE_URL+"/subject/getSubjects",
    GETQUESTIONS_API: BASE_URL+"/subject/getSubjectQuestions/",
    GETQUIZ_API: BASE_URL+"/subject/getSubjectQuiz/",
}

export const departmentEndpoints = {
    ADD_DEPARTMENT_API: BASE_URL + "/department/addDepartment/",
    GET_ALLDEPARTMENTS_API: BASE_URL + "/department/getAllDepartment/",
    GET_DEPARTMENT_API: BASE_URL + "/department/getDepartment/"
}

export const tagEndpoints = {
    GET_API : BASE_URL+"/tag/getTags",
    GETQUESTIONS_API : BASE_URL+"/tag/getTagsQues/",
    ADD_DESC_API : BASE_URL+"/tag/addDesc",
}

export const answerEndpoints = {
    POST_ANSWER_API: BASE_URL+"/answer/post/id",
    DELETE_ANSWER_API: BASE_URL+"/answer/delete/id",
    VOTE_ANS_API: BASE_URL+"/answer/vote/id",
}

export const quizEndpoints = {
    CREATE_QUIZ_API: BASE_URL + "/quiz/createQuiz",
    CREATE_QUIZ_QUESTION_API: BASE_URL + "/quiz/createQuizQuestion",
    GET_QUIZ_API: BASE_URL + "/quiz/getQuiz/",
    SUBMIT_QUIZ_API: BASE_URL + "/quiz/submitQuiz",
    DELETE_QUESTION_API: BASE_URL + "/quiz/deleteQuestion",
    DELETE_QUIZ_API: BASE_URL + "/quiz/deleteQuiz/",
    GET_ALL_QUIZ_API: BASE_URL + "/quiz/getAllQuiz",
}

export const resultEndpoints = {
    GET_MY_RESULT_API: BASE_URL+"/result/getMyResult/",
    QUIZZES_API: BASE_URL+"/result/",
    QUIZ_RESULT_API: BASE_URL+"/result/quizResult",
}

export const adminEndPoints = {
    GET_PENDING_INSTRUCTOR_API : BASE_URL+"/admin/getPendingInstructor",
    ACCEPT_INSTRUCTOR_API : BASE_URL+"/admin/acceptInstrut",
    REJECT_INSTRUCTOR_API : BASE_URL+"/admin/rejectInstrut",
}

export const resourceEndPoints = {
    POST_API : BASE_URL + "/resources/",
    GET_ALL_RESOURCES : BASE_URL + "/resources/"
}