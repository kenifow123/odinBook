
const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController.js');
const passport = require('passport');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()})
require('../config/passport.js')

postRouter.get('/allPosts', passport.authenticate("jwt", { session: false }), postController.allFollowedPostsGet);
postRouter.post('/createPost', passport.authenticate("jwt", { session : false}), upload.single("file"),  postController.createPostPost );
postRouter.put('/likePost/:postId', passport.authenticate("jwt", { session : false}), postController.likePostPut);
postRouter.post('/createComment/:postId', passport.authenticate("jwt", { session : false}), postController.createCommentPost);
postRouter.put('/likeComment/:commentId', passport.authenticate("jwt", { session: false}), postController.likeCommentPut);

module.exports = postRouter;
