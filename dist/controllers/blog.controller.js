"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBlog = void 0;
var _models = require("../../models");
var _cloudinary = _interopRequireDefault(require("../middlewares/cloudinary"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createBlog = async (req, res) => {
  const result = await _cloudinary.default.uploader.upload(req.file.path);
  let blog = await _models.Blog.create({
    blogTitle: req.body.blogTitle,
    blogDescription: req.body.blogDescription,
    blogImage: result.secure_url
  });
  res.status(201).json({
    status: "success",
    message: "Blog created successfully",
    data: blog
  });
};
exports.createBlog = createBlog;