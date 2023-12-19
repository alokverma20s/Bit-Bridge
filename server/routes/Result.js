import express from 'express'

import { QuizResult, Quizzes, getMyResult } from "../controllers/Result.js";
import {auth} from '../middlewares/auth.js';

const router = express.Router();

router.get('/getMyResult/:userid', getMyResult);
router.get('/:userid', Quizzes);
router.post('/quizResult', QuizResult);

export default router;
