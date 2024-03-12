import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username :{
        type : String,
        required: true,
        unique : true
    },
    password : {
        type: String,
        required: true
    },
    notes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
},{
    timestamps: true
});


export const User = mongoose.model("User",UserSchema);