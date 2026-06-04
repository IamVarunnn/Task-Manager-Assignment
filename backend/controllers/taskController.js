const Task = require("../models/Task");

const createTask = async (req, res) => {

    const { title, description } = req.body;

    const task = await Task.create({
        title,
        description,
        userId: req.user._id
    });

    res.status(201).json(task);
};

const getTasks = async (req, res) => {

    const tasks = await Task.find({
        userId: req.user._id
    });

    res.status(200).json(tasks);
};

const updateTask = async (req, res) => {

    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({
            message: "Not Authorized"
        });
    }

    task.title =
        req.body.title || task.title;

    task.description =
        req.body.description || task.description;

    task.status =
        req.body.status || task.status;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
};

const deleteTask = async (req, res) => {

    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({
            message: "Not Authorized"
        });
    }

    await task.deleteOne();

    res.status(200).json({
        message: "Task deleted successfully"
    });
};

const toggleTaskStatus = async (req, res) => {

    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({
            message: "Not Authorized"
        });
    }

    task.status =
        task.status === "pending"
            ? "completed"
            : "pending";

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    toggleTaskStatus
};