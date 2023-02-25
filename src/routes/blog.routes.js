import express from "express"
import upload from "../middlewares/multer";
import { createBlog, getBlogWithComments , getAllBlogs, getBlogById} from "../controllers/blog.controller";
const router = express.Router();


router.post("/blog/post", upload.single("blogImage"), createBlog);
router.get("/blog/:blogId/comments/get",  getBlogWithComments);
router.get("/blog/get",  getAllBlogs);
router.get("/blog/:id/get",  getBlogById);


module.exports = router;
  