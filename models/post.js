const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    status:{
        type : String ,
    },
    colorCode: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    choiceOfService: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Request=mongoose.model("requests", postSchema);

module.exports=Request;