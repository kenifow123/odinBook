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

        //comparing non hashed for dev
        // const match = await bcrypt.compare(req.body.password, user.password)
        const match = await bcrypt.compare(req.body.password, user.password) || (req.body.password === user.password);

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

const followRequestPost = async (req, res) => {
    const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
            OR: [
                { requesterId: req.user.id, requestedId: Number(req.params.requestedUserId)},
                { requesterId: Number(req.params.requestedUserId), requestedId: req.user.id}
            ],
        }
    })

    if (existingFollowRequest) {
        return res.status(409).json({
            message: 'Follow request already exists between these users'
        })
    } else {
        const followRequest = await prisma.followRequest.create({
            data: {
                requesterId: req.user.id,
                requestedId: Number(req.params.requestedUserId),
            }
        })

        res.json(followRequest);
    }


}

const acceptFollowPut = async (req, res) => {
    const user = await prisma.user.update({
        where: {
            id: Number(req.user.id),
        },
        data: {
            following: {
                connect: {
                    id: Number(req.params.followerUserId),
                }
            }
        }
    })

    res.json({message: req.user.id + " accepted follower " + req.params.followerUserId});
}

const AfollowBPut = async (req, res) => {
    const user = await prisma.user.update({
        where: {
            id: Number(req.params.currUserId),
        },
        data: {
            followedBy: {
                connect: {
                    id: Number(req.params.followerUserId),
                }
            }
        }
    })

    res.json({user})

}

const allUsersGet = async (req, res) => {
    const users = await prisma.user.findMany({
        where: {
            id: {
                not: req.user.id,
            }
        },
        include: {
            followedBy: true,
            receivedFollowRequests: true,
            profile: true,
        }
    })

    res.json(users);
}

const currUserFollowRequestsGet = async (req, res) => {
    const followRequests = await prisma.followRequest.findMany({
        where: {
            OR: [
                {requesterId: req.user.id} ,
                {requestedId: req.user.id}
            ]
        },
        include: {
            requested: true,
            requester: true,
        }
    })

    res.json(followRequests);
}

const requestedUserFollowRequestsGet = async (req, res) => {
    console.log(req.user);
    const followRequests = await prisma.followRequest.findMany({
        where : {
            requestedId: req.user.id,
        },
        include: {
            requested: true,
            requester: {
                include: {
                    profile: true,
                }
            }
        }
    })

    res.json(followRequests);
}

const followRequestDelete = async (req, res) => {
    const followRequest = await prisma.followRequest.delete({
        where: {
            id: Number(req.params.id),
        }
    })

    res.json({message: 'deleted follow request'})
}

module.exports = {
    signupPost,
    loginPost,
    followRequestPost,
    acceptFollowPut,
    AfollowBPut,
    allUsersGet,
    currUserFollowRequestsGet,
    requestedUserFollowRequestsGet,
    followRequestDelete
};