import express from 'express'

import { acceptInstrut, getPendingInstructor, rejectInstrut } from '../controllers/Admin.js';

import {auth, isAdmin} from "../middlewares/auth.js"

const router = express.Router();

router.get('/getPendingInstructor', auth, isAdmin,  getPendingInstructor);
router.post('/acceptInstrut', auth, isAdmin , acceptInstrut);
router.post('/rejectInstrut', auth, isAdmin, rejectInstrut);

export default router;