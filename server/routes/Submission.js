import express from 'express';
import { makeSubmission, getSubmission, getSubmissionById, updateSubmission } from '../controllers/submission.js';

const router = express.Router();

router.post('/', makeSubmission);
router.get('/getSubmission', getSubmission);
router.get('/getSubmission/:id', getSubmissionById);

export default router;
