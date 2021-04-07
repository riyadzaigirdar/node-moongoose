const express = require("express")
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/post", { useNewUrlParser: true, useUnifiedTopology: true } )
const Schema = mongoose.Schema

const commentSchema = new Schema({
    user_id:{type: String, required: true},
    body: String,
    image: String
}, {collection: "comment"})

const Comment = mongoose.model("comment", commentSchema)


const app = express()
app.use(express.json())
// app.use(express.urlencoded({extender: false}))

app.get("/", (req,res)=>{
    Comment.find().then((data)=>{
        res.json(data)
    })
})

app.post("/add", (req, res)=>{
    let item = {
        user_id: req.body.user_id,
        body: req.body.body,
        image: req.body.image
    }

    var insertion = Comment(item)
    insertion.save()

    res.json({status: "success", data: insertion})
})

app.post("/update/:id",(req, res)=>{
    let id = req.params.id

    Comment.findById(id, (err, doc)=>{
        if(err) return res.json({error: err})

        doc.user_id = req.body.user_id ? req.body.user_id : doc.user_id
        doc.body = req.body.body ? req.body.body : doc.body
        doc.image = req.body.image ? req.body.image : doc.image
        doc.save()

        return res.json({status: "updated", data: doc})
    })

})

app.delete("/delete/:id", (req, res)=>{
        let id = req.params.id
        Comment.findByIdAndDelete(id, (err, data)=>{
            if(err) return res.json({error: err})
            res.json({status: "deleted", data: data})
        })
})

app.listen(3000, ()=> console.log("server runnging on 3000"))