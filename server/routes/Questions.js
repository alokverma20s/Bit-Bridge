import express from 'express'

import { AskQuestion, getAllQuestion, deleteQuestions, voteQuestion, getQuestionById} from '../controllers/Questions.js'
const router = express.Router();
import upload from '../middlewares/multer.js';

router.post('/Ask', upload.single('file'), AskQuestion)
router.get('/get', getAllQuestion)
router.get('/get/:id', getQuestionById)
router.delete('/delete/:id', deleteQuestions);
router.patch('/vote/:id', voteQuestion);

export default router;