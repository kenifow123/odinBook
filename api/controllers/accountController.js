const { prisma } = require("../lib/prisma.js");
const bcrypt = require('bcryptjs');

const signupPost = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        }
    })

    res.json(user);
}

const loginPost = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username,
            },
            include: {
                profile: true,
                followers: true,
                followedBy: true,
                likedPosts: true,
                likeComments: true,
                comments: true,
                posts: true
            }
        });

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            res.status(401).json({message : "Password incorrect"});
        }

        console.log('Login Successful');
        jwt.sign({ user}, process.env.JWT_SECRET, {expiresIn: "1h"}, (err, token) => {
            res.json({token, user});
        });
    } catch (error) {
        res.status(401).json({message : error.message});
    }
}

module.exports = {
    signupPost,
    loginPost
};