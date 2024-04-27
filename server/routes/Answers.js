import express from 'express'

import { postAnswer, deleteAnswer, voteAnswer } from '../controllers/Answers.js'
import upload from '../middlewares/multer.js';

const router = express.Router();

router.patch('/post/:id',upload.single('file'), postAnswer)
router.patch('/delete/:id',deleteAnswer)
router.patch('/vote/:id', voteAnswer)

export default router;