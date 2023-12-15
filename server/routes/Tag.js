import express from 'express'

import { addTagDescription, getQuestionByTagName, getTags } from "../controllers/Tag.js";

const router = express.Router();

router.post('/addDesc', addTagDescription);
router.get('/getTags', getTags);
router.get('/getTagsQues/:tagId', getQuestionByTagName);

export default router;
