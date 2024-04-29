import express from 'express'
import { deleteMessage, getMessages, getMessagesById, markAsRead, markAsUnread, postMessage } from '../controllers/contact.js';



const router = express.Router();

router.post('/', postMessage);
router.get('/getMessage', getMessages);
router.delete('/deleteMessage/:id', deleteMessage);
router.get('/markAsUnread/:id', markAsUnread);
router.get('/markAsRead/:id', markAsRead);
router.get('/getMessage/:id', getMessagesById);


export default router;