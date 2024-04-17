import express from 'express';
import {addResource} from '../controllers/resourceController.js'
import multer from 'multer';
const upload = multer({dest: './files'});

const router = express.Router();

router.route("/:subjectId").post(upload.single('file'), addResource);

export default router;