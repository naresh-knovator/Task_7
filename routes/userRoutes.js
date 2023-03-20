const express = require("express");
const route = express.Router();
const { updateUser, deleteUser, createAlbumOfUser, getAlbumOfUser } = require("../controller/userController");

route.get("/album", getAlbumOfUser)  // API_1  
route.post("/album", createAlbumOfUser)  // API_2
route.put("/:id", updateUser) // API_3
route.delete("/:id", deleteUser) // API_4

module.exports = route;