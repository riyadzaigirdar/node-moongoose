const mongoose = require("../db/db")

const Schema = mongoose.Schema

const commentSchema = new Schema({
    user_id:{type: String, required: true},
    body: String,
    image: String
}, {collection: "comment"})

const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment