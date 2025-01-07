
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../Controllers/TasksController');
const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();


router.post('/', ensureAuthenticated, createTask);
router.get('/', ensureAuthenticated, getTasks);
router.get('/:id', ensureAuthenticated, getTaskById);
router.put('/:id', ensureAuthenticated, updateTask);
router.delete('/:id', ensureAuthenticated, deleteTask);

module.exports = router;
