require("dotenv").config();

const cors = require("cors");
const express = require("express");
const testRoutes = require("./routes/testRoutes");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
const authRoutes = require("./routes/authRoutes");

// Connect MongoDB
connectDB();
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send("Backend Running");
});

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});