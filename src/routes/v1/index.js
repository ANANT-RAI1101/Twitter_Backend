import express from 'express';
import { createTweet,getTweet } from '../../controllers/tweet-controller.js';
import { signup,login } from '../../controllers/user-controller.js';
import { createComment } from '../../controllers/comment-controller.js';
import { authenticate } from '../../middlewares/auth-middleware.js';
const router=express.Router();

router.post("/tweets",createTweet)
router.get("/tweets/:id",getTweet)

router.post("/signup",signup)
router.post("/login",login)

router.post("/comments",authenticate,createComment)



export default router