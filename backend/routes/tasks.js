const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to all routes in this file globally
router.use(authMiddleware);

// 1. CREATE A TASK (POST /api/tasks)
router.post('/', async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Task title is required.' });
        }

        const newTask = new Task({
            title,
            description,
            status,
            user: req.user.userId // Extracted from the validated JWT token
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET ALL TASKS FOR THE LOGGED-IN USER (GET /api/tasks)
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. UPDATE A TASK (PUT /api/tasks/:id)
router.put('/:id', async (req, res) => {
    try {
        const { title, description, status } = req.body;

        // Find the task and ensure it belongs to the authenticated user
        let task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
        if (!task) {
            return res.status(404).json({ error: 'Task not found or unauthorized.' });
        }

        // Update fields if provided
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;

        await task.save();
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. DELETE A TASK (DELETE /api/tasks/:id)
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
        
        if (!task) {
            return res.status(404).json({ error: 'Task not found or unauthorized.' });
        }

        res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;