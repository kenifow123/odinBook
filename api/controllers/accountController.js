const { prisma } = require("../lib/prisma.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

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
                following: true,
                followedBy: true,
                likedPosts: true,
                likedComments: true,
                comments: true,
                posts: true,
            }
        });

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            res.status(401).json({message : "Password incorrect"});
        }

        console.log('Login Successful');
        jwt.sign({ user}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"}, (err, token) => {
            res.json({token, user});
        });
    } catch (error) {
        res.status(401).json({message : error.message});
    }
}

const followRequestPut = async (req, res) => {
    const followRequest = await prisma.followRequest.create({
        data: {
            requesterId: req.user.id,
            requestedId: Number(req.params.requestedUserId),
        }
    })

    res.json(followRequest);
}

const acceptFollowPut = async (req, res) => {
    const user = await prisma.user.update({
        where: {
            id: req.user.id,
        },
        data: {
            followers: {
                connect: {
                    id: req.params.followerUserId,
                }
            }
        }
    })

    res.json({message: req.user.id + " accepted follower " + req.params.followerUserId});
}

module.exports = {
    signupPost,
    loginPost,
    followRequestPut,
    acceptFollowPut,
};