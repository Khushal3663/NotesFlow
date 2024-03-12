import express from 'express'
import { createNote, deleteNote, getNote, getNotes, updateNote } from '../controllers/notes.controller.js';
import { authenticateToken } from '../auth/auth.user.js';

const notesRouter = express.Router();

notesRouter.get('/',authenticateToken, getNotes);
notesRouter.post('/',authenticateToken,createNote);
notesRouter.get('/:id',authenticateToken,getNote);
notesRouter.put('/:id',authenticateToken,updateNote);
notesRouter.delete('/:id',authenticateToken,deleteNote);


export default notesRouter;