import express from "express"
import {userRegister,getAllUsers,getUserById, deleteUser, getUserWithMessages} from "../controllers/user.controllers"
const router = express.Router();


router.post("/user/post", userRegister)
router.get("/user/get", getAllUsers)
router.get("/user/:id/get", getUserById)
router.delete("/user/:id/delete", deleteUser)
router.get("/user/:id/message/get", getUserWithMessages)

module.exports = router;

