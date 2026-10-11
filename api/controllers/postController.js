const { prisma } = require('../lib/prisma.js');
const cloudinary = require("../lib/cloudinary.js")

const createPostPost = async (req, res) => {
    try {
        let imageUrl = null;
        if (req.file){
            imageUrl = await cloudinary.getCloudinaryUrl(req.file);
        }
        const post = await prisma.post.create({
            data: {
                content: req.body.content,
                imageUrl,
                authorId: req.user.id,
            }
        })

        res.json(post);
    } catch (error) {
        res.json(error);
    }


}

const allFollowedPostsGet = async (req, res) => {
    const response = await prisma.post.findMany({
        where : {
            OR: [
                {
                author: {
                    followedBy: {
                        some: {
                            id: req.user.id,
                        }
                    }
                }
                },
                {
                    authorId: req.user.id,
                }
            ]

        },
        include: {
            author: {
                include: {
                    profile: true,
                }
            },
            usersLiked: true,
            comments: {
                include: {
                    author: {
                        include: {
                            profile: true,
                        }
                    }
                }
            },
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
    res.json(response);
}

const likePostPut = async (req, res) => {
    const response = await prisma.post.update({
        where: {
            id: Number(req.params.postId),
        },
        data: {
            usersLiked: {
                connect: {
                    id: req.user.id,
                }
            }

        }
    })
    res.json(response);
}

const createCommentPost = async (req, res) => {
    const response = await prisma.comment.create({
        data: {
            content: req.body.content,
            authorId: req.user.id,
            postId: Number(req.params.postId),
        }
    })

    res.json(response);
}

const likeCommentPut = async (req, res) => {
    const response = await prisma.comment.update({
        where: {
            id: Number(req.params.commentId),
        },
        data: {
            usersLiked: {
                connect: {
                    id: req.user.id,
                }
            }
        }
    })

    res.json(response);
}

const findCommentsGet = async (req, res) => {
    const response = await prisma.comment.findMany({
        where: {
            postId: Number(req.params.postId),
        },
        include: {
            author: true,
            post: true,
            usersLiked: true,
        }
    })
}

module.exports = {
    createPostPost,
    allFollowedPostsGet,
    likePostPut,
    createCommentPost,
    likeCommentPut,
    findCommentsGet,
}