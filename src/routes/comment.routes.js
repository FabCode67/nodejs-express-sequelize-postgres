import express from "express"
import { createComment } from "../controllers/comment.controllers";
const router = express.Router();

router.post("/:userId/:blogId/comment/post", createComment)

module.exports = router