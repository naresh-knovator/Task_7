const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const { notFound, errorHandle } = require("./middleware/errorHandler");
const port = process.env.PORT || 8080
const userRoutes = require("./routes/userRoutes")
const dbConnect = require("./config/dbConnect")
dbConnect(); //Database

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/user", userRoutes)
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    max: 2,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP"
});
app.use(limiter);
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Hello from the express server"
    });
});
app.use(notFound)
app.use(errorHandle)

app.listen(port, () => console.log(`Listening on port ${port}`))