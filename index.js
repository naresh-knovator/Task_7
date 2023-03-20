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

app.use(notFound)
app.use(errorHandle)

app.listen(port, () => console.log(`Listening on port ${port}`))