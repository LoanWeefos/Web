const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasksController')

router.get('/', taskController.getTasks);

router.post('/', taskController.addTask);

router.delete('/:index', taskController.deleteTask);

module.exports = router;