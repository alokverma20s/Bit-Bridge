import express from 'express'

import { QuizResult, Quizzes, getMyResult } from "../controllers/Result.js";

const router = express.Router();

router.get('/getMyResult/:userid', getMyResult);
router.get('/:userid', Quizzes);
router.get('/quizResult/:userid/:quizid', QuizResult);

export default router;
