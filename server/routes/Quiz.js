import express from 'express'

import { createQuiz, addQuestion, getAllQuesitons, getQuiz, submitQuiz, deleteQuestion, deleteQuiz, getAllQuiz } from '../controllers/Quiz.js'
const router = express.Router();

router.post('/createQuiz', createQuiz)
router.post('/createQuizQuestion', addQuestion)
// router.get('/getAllQuestion', getAllQuesitons);
router.get('/getQuiz/:quizId', getQuiz);
router.post('/submitQuiz', submitQuiz);
router.post('/deleteQuestion', deleteQuestion);
router.get('/deleteQuiz/:quizId', deleteQuiz);
router.get('/getAllQuiz', getAllQuiz);


export default router;