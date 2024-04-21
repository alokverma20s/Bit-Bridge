import express from 'express';
import {addResource, getAllResources} from '../controllers/resourceController.js'
import upload from '../middlewares/multer.js';

const router = express.Router();

router.route("/:subjectId").post(upload.single('file'), addResource);
router.route("/:subjectId").get(getAllResources);

export default router;