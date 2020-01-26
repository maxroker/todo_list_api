const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const TasksController = require('../controllers/tasks_controller');


router.get("", TasksController.tasks_get_all);

router.post("", checkAuth, TasksController.task_create);

router.get("/:taskId", TasksController.task_get);

router.put('/:taskId', checkAuth, TasksController.task_edit);

router.delete('/:taskId', checkAuth, TasksController.task_delete);


module.exports = router;