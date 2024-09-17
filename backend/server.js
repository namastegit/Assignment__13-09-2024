const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const taskScheduler = require('./services/taskScheduler');
const { connectDB } = require('./config/databse');
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tasks",taskRoutes)


taskScheduler.start();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Running on PORT : " + PORT)
})


