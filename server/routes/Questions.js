import express from 'express'

import { AskQuestion, getAllQuestion, deleteQuestions, voteQuestion} from '../controllers/Questions.js'
const router = express.Router();

router.post('/Ask', AskQuestion)
router.get('/get', getAllQuestion)
router.delete('/delete/:id', deleteQuestions);
router.patch('/vote/:id', voteQuestion);

export default router;