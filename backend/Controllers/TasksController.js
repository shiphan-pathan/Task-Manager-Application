
const Task = require('../Models/Tasks');
// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, status} = req.body;

        const {id:userId} = req.user; 

        const task = await Task.create({
            title,
            description,
            status, 
            userId, 
        });

        return res.status(201).json({
            message: 'Task created successfully',
            task,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error creating task',
            error: error.message,
        });
    }
};

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
    try {

        //const {userId} = req.body;
       // const userId = 1; 
        const tasks = await Task.findAll({ where: { userId: req.user.id} });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};
;


// Get a specific task
const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ where: { id, userId: req.user.id } });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const task = await Task.findOne({ where: { id, userId: req.user.id } });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        await task.save();

        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ where: { id, userId: req.user.id } });
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };

