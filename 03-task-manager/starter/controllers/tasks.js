const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')

const getAllTask = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(201).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = new Task(req.body)
    await task.save()
    res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res ,next) => {
    const { id: taskID } = req.params
    const SingleTaks = await Task.findOne({ _id: taskID })
    if (!SingleTaks) {
        const error = new Error('Not Found')
        error.status = 404;
        return next(error)
        
    }
    res.status(201).json({ SingleTaks })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
        return res.send(404).json({ msg: `No task with id : ${taskID}` })
    }
    res.status(201).json({ task })
})

module.exports = {
    getAllTask,
    deleteTask,
    updateTask,
    getTask,
    createTask

}