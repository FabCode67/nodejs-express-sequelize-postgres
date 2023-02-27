"use strict";

var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("../middlewares/multer"));
var _blog = require("../controllers/blog.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post("/blog/post", _multer.default.single("blogImage"), _blog.createBlog);
router.get("/blog/:blogId/comments/get", _blog.getBlogWithComments);
router.get("/blog/get", _blog.getAllBlogs);
router.get("/blog/:id/get", _blog.getBlogById);
module.exports = router;