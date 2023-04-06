const express = require("express");
const route = express.Router();
const { updateUser, deleteUser, createAlbumOfUser, getAlbumOfUser } = require("../controller/userController");
const { userValidate, albumValidate } = require("../validation/validate")

route.get("/album", userValidate, albumValidate, getAlbumOfUser)  // API_1  
route.post("/album", userValidate, albumValidate, createAlbumOfUser)  // API_2
route.put("/:id", userValidate, albumValidate, updateUser) // API_3
route.delete("/:id", userValidate, albumValidate, deleteUser) // API_4

module.exports = route;