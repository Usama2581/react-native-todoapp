// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const todoSchema = new Schema({
//     text: {
//         type: String,
//         minlength: 4,
//         required: true
//     }
// })

// const todo = mongoose.model('todo', todoSchema)

// module.exports = todo

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    text: {
        type: String,
        minlenght: 5,
        required: true 
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo