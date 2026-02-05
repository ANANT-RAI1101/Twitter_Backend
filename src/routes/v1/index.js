import express from 'express';
import { createTweet,getTweet } from '../../controllers/tweet-controller.js';
import { signup,login } from '../../controllers/user-controller.js';
const router=express.Router();

router.post("/tweets",createTweet)
router.get("/tweets/:id",getTweet)

router.post("/signup",signup)
router.post("/login",login)

export default router