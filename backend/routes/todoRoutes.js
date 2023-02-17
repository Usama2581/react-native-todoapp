const express = require('express')
const router = express.Router()
const Todo = require('../config/todoModel')



router.post('/insert', async (req, res) => {
    const { text } = req.body
    try {
        const todo = new Todo(req.body)
        await todo.save()
        res.send({ message: 'success' })
    } catch (e) {
        res.send({ message: e.message})
    }

})

router.get('/', async(req, res) => {
    const data = await Todo.find()
    res.send(data)
})


router.delete('/delete/:id', async (req, res) => {
    let id = req.params.id
    try {
        let result = await Todo.findByIdAndDelete(id)
        res.send(result)
    } catch (error) {
        res.send({ message: e.message})
    }
})


router.put('/update/:id', async (req, res) => {
    let id = req.params.id
    let { text } = req.body
        
    try {
        let result = await Todo.findByIdAndUpdate(id, req.body )
        res.send(result)
    } catch (e) {
        res.send({ message: e.message})
    }

})
module.exports = router
