const { prisma } = require("../lib/prisma.js")
const cloudinary = require("../lib/cloudinary.js")

const openProfileGet = async (req, res) => {
    const response = await prisma.profile.findUnique({
        where: {
            userId: req.user.id,
        }
    })

    res.json(response);
}

const createProfilePost = async (req, res) => {
    const profile = await prisma.profile.create({
        data: {
            userId: req.user.id,
        }
    })

    res.json(profile);
}

const changeProfilePicPost = async (req, res) => {
    const imageUrl = cloudinary.getCloudinaryUrl(req.file);
    const profile = await prisma.profile.update({
        where: {
            userId: req.user.id,
        },
        data: {
            imageUrl: req.user.imageUrl,
        }
    })
}

module.exports = {
    openProfileGet,
    createProfilePost,
    changeProfilePicPost,

}