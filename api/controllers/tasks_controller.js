const url = "http://localhost:3000"; // "API_URL": "https://node-rest-api-shop.herokuapp.com", for development mode

const mongoose = require('mongoose');

const Task = require('../models/task');


exports.tasks_get_all = (req, res, next) => {
  Task.find()
    .select('_id text createDate completedAt completed _creator')
    .exec()
    .then(tasks => {
      const response = {
        count: tasks.length,
        products: tasks.map(task => {
          return {
              _id: task._id,
              text: task.text,
              createDate: task.createDate,
              completedAt: task.completedAt,
              completed: task.completed,
              _creator: task._creator
            }
          })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
};


exports.task_create = (req, res, next) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    text: req.body.text,
    createDate: req.body.createDate,
    completedAt: req.body.completedAt,
    completed: req.body.completed,
    _creator: req.userData.userId
  });

  task.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created task successfully",
        _id: result._id,
        text: result.text,
        createDate: result.createDate,
        completedAt: result.completedAt,
        completed: result.completed,
        _creator: result._creator
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    }); 
};


exports.task_get = (req, res, next) => {
  const id = req.params.taskId;
  Task.findById(id)
    .select('_id text createDate completedAt completed _creator')
    .exec()
    .then(result => {
      // console.log("From database", result);
      if (result) {
        res.status(200).json({
          _id: result._id,
          text: result.text,
          createDate: result.createDate,
          completedAt: result.completedAt,
          completed: result.completed,
          _creator: result._creator
        });
      } else {
        res.status(404).json({message: 'No valid entry found for provided ID'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
};


exports.task_edit = (req, res, next) => {
  const id = req.params.taskId;
  // const updateOps = {};
  // console.log(id);  
  // console.log(req.body);
  // for (prop in req.body) {

  // }
  // req.body.foreach(prop => {
  //   prop
  // })
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }
  Task.update({_id: id}, { $set: req.body })
    .exec()
    .then(() => {
      Task.findById(id)
        .select('_id text createDate completedAt completed _creator')
        .then(result => {
          console.log(result);
          res.status(200).json({
            message: 'Task has been updated',
            _id: result._id,
            text: result.text,
            createDate: result.createDate,
            completedAt: result.completedAt,
            completed: result.completed,
            _creator: result._creator
          });
        })
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.task_delete = (req, res, next) => {
  const id = req.params.taskId;
  Task.remove({_id: id})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Task has been deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
};