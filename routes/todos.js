const express = require('express');
const verifyToken = require('../middlewares/auth');
const Todo = require('../models/todo');

const router = express.Router();

// Create todo
router.post('/', verifyToken, async(req, res)=>{
    if(!req.body.title){
        return res.status(400).send({
            message: 'Please fill all the required fields.'
        })
    }
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        isCompleted: req.body.isCompleted
    });
    try {

        const result = await todo.save();
        res.status(201).json(result);

    } catch (error) {

        res.status(500).json(error);

    }

})

// Get all todos
router.get('/', verifyToken, async(req, res) => {
    try {
        const results = await Todo.find();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Delete todos by id
router.delete('/:id', async(req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Todo deleted successfully'
        });
    } catch (error) {
        res.status(500).json(error);
    }
})

// Update todos
router.put('/:id', async(req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            message: 'Todo updated successfully.'
        });
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get todo by id
router.get('/:id', async(req, res) => {
    try {
        const result = await Todo.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;