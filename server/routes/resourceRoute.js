import express from 'express';
import {addResource} from '../controllers/resourceController.js'
import upload from '../middlewares/multer.js';

const router = express.Router();

router.route("/:subjectId").post(upload.single('file'), addResource);

export default router;