const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    toggleTaskStatus
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

router.patch("/:id/status", protect, toggleTaskStatus);

module.exports = router;