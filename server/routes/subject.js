import express from 'express'

import { addSubject, getSubjectQuestion, getSubjects } from "../controllers/subject.js";

const router = express.Router();

router.post('/addSubject', addSubject);
router.get('/getSubjects', getSubjects);
router.get('/getSubjectQuestions/:subjectId', getSubjectQuestion);

export default router;
