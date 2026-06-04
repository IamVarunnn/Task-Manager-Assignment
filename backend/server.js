const express = require("express");
const testRoutes = require("./routes/testRoutes");

const app = express();

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.use("/api/test", testRoutes);

app.listen(5000, () => {
    console.log("Server Running");
});