import express from 'express'

import { acceptInstrut, getPendingInstructor, rejectInstrut } from '../controllers/Admin.js';

import {auth, isAdmin} from "../middlewares/auth.js"

const router = express.Router();

router.get('/getPendingInstructor', getPendingInstructor);
router.post('/acceptInstrut', acceptInstrut);
router.post('/rejectInstrut', rejectInstrut);

export default router;