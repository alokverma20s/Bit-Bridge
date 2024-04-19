import express from 'express'

const router = express.Router()

import { createContest, getContest, updateContest, deleteContest, getContestById } from '../controllers/contest.js'

router.post('/createContest', createContest)
router.get('/getAllContest', getContest)
router.get('/getContest/:id', getContestById)
router.put('/updateContest/:id', updateContest)
router.delete('/deleteContest/:id', deleteContest)

export default router
// Compare this snippet from server/controllers/problem.js:
