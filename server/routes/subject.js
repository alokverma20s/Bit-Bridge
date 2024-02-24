import express from 'express'

import { addSubject, getSubjectQuestion, getSubjectQuiz, getSubjects } from "../controllers/subject.js";

const router = express.Router();

router.post('/addSubject', addSubject);
router.get('/getSubjects', getSubjects);
router.get('/getSubjectQuestions/:subjectId', getSubjectQuestion);
router.get('/getSubjectQuiz/:subjectId', getSubjectQuiz);

export default router;
