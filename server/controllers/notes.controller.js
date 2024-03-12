import { Note } from "../models/notes.models.js"
import { User } from "../models/users.models.js";



const getNotes = async (req, res)=>{
    
    
    try {
        const notes = await Note.find({user:req.user.userId}).sort('-updatedAt');
        res.status(200).json(notes);
        
    } catch (error) {
        res.status(500).json({ error:error});
    }
}

// Getting  a note

const getNote = async (req, res) => {
    try {
        
        const note = await Note.findById( req.params.id)
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error:error});
    }
}


// creating note

const createNote = async (req, res) => {
    try {
        const myNote = {...req.body,user:req.user.userId};
        const newNote = new Note(myNote);
        const noteMade = await newNote.save();
        await User.findByIdAndUpdate(req.user.userId,{ $push: { notes: noteMade._id } })
        res.status(200).json({message: "data inserted"})
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

// upadate note

const updateNote = async (req, res)=>{
    
    try {
        const note = await Note.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({message: "data updated",note : note})
    } catch (error) {
        res.status(500).json({ error:error});
    }
}

const deleteNote= async (req, res)=>{
    
    try {
        const note = await Note.findById(req.params.id);
        await Note.findByIdAndDelete(req.params.id);
        await User.findByIdAndUpdate(req.user.userId, {$pull: {notes : note._id}});
        res.status(200).json({message:"note deleted"});
    } catch (error) {
        res.status(500).json({error:error});
    }
}




export {
    getNotes,
    createNote,
    getNote,
    updateNote,
    deleteNote
};