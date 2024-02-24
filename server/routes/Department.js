import express from 'express'

import { addDepartment, getAllDepartment, getDepartment } from '../controllers/Department.js'

const router = express.Router();

router.post('/addDepartment', addDepartment)
router.get('/getAllDepartment', getAllDepartment)
router.get('/getDepartment/:id', getDepartment)

export default router;