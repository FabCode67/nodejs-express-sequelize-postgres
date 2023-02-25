import express from "express"
import { createMessage, getAllMessages } from "../controllers/message.controller"

const router = express.Router();


router.post("/user/:id/message", createMessage)
router.get("/messages/get", getAllMessages)

module.exports = router;
