import express from 'express'
import { postMessage } from '../controllers/contact.js';



const router = express.Router();

router.post('/', postMessage);

export default router;