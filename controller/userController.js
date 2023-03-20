const User = require("../model/userModel");
const Album = require("../model/albumModel");
const asyncHandler = require("express-async-handler");

// API_1
const getAlbumOfUser = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        const albums = await Album.find();
        const responseData = [];
        for (let user of users) {
            const userAlbums = albums.filter(album => album.userId === user.id);
            for (let album of userAlbums) {
                responseData.push({
                    id: album.id,
                    title: album.title,
                    user: {
                        id: user.id,
                        name: user.name,
                    }
                });
            }
        }
        res.json(responseData);
    } catch (error) {
        throw new Error(error)
    }
})

// API_2
const createAlbumOfUser = asyncHandler(async (req, res) => {
    const { id, userId, title } = req.body;
    try {
        const user = await User.findOne({ id: userId })
        if (user) {
            const findAlbum = await Album.findOne({ id })
            if (!findAlbum) {
                const album = await Album.create({ id, title, userId });
                res.json({
                    userId: user.id,
                    id: album.id,
                    title: album.title,
                })
            } else {
                throw new Error("Album Already Created")
            }
        } else {
            throw new Error("There is no User Here")
        }
    } catch (error) {
        throw new Error(error)
    }
})

// API_3
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findUser = await User.findOne({ id }); {
            if (findUser) {
                const user = await User.findOneAndUpdate({ id }, req.body, { new: true });
                res.json({
                    status: "success",
                    user
                })
            } else {
                throw new Error("There is no User Here")
            }
        }
    } catch (error) {
        throw new Error(error)
    }
})

// API_4
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findUser = await User.findOne({ id })
        if (findUser) {
            const user = await User.findOneAndDelete({ id });
            const albums = await Album.find({ userId: id });
            for (let album of albums) {
                await Album.findOneAndDelete({ id: album.id });
            }
            res.json({
                status: "success",
                message: "User and associated albums are deleted",
                user: user,
                albums: albums
            })
        } else {
            throw new Error("User not found")
        }
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    updateUser,
    deleteUser,
    createAlbumOfUser,
    getAlbumOfUser
}