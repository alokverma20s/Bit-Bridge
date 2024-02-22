import express from 'express'

import { postAnswer, deleteAnswer, voteAnswer } from '../controllers/Answers.js'

const router = express.Router();

router.patch('/post/:id', postAnswer)
router.patch('/delete/:id',deleteAnswer)
router.patch('/vote/:id', voteAnswer)

export default router;