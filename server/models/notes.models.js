import mongoose from "mongoose";

const NoteSchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    body : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true});

export const Note = mongoose.model('Note',NoteSchema);