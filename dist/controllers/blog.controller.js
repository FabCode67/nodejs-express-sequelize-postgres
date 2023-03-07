"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBlog = exports.getBlogWithComments = exports.getBlogById = exports.getAllBlogs = exports.deleteBlog = exports.createBlog = void 0;
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
const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await _models.Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blog not found"
      });
    }

    // Update the blog with the new values
    const result = await _cloudinary.default.uploader.upload(req.file.path);
    const updatedBlog = await blog.update({
      blogTitle: req.body.blogTitle,
      blogDescription: req.body.blogDescription,
      blogImage: result.secure_url
    });
    res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
      data: updatedBlog
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};
exports.updateBlog = updateBlog;
const getBlogWithComments = async (req, res) => {
  const blogId = req.params.blogId;
  const blog = await _models.Blog.findOne({
    where: {
      id: blogId
    },
    include: _models.Comment
  });
  if (!blog) {
    return res.status(404).json({
      status: "error",
      message: "Blog not found"
    });
  }
  res.status(200).json({
    status: "success",
    data: blog
  });
};

// export const getAllBlogsWithNumberOfCommentsToEach = async(req,res)=> {

//   const blogs = await Blog.findAll();
//   const blogsWithCommentsCount = [];

//     for (let i = 0; i < blogs.length; i++) {
//       const blog = blogs[i];
//       const commentsCount = await Comment.count({ blog: blog._id });
//       blogsWithCommentsCount.push({
//         blog,
//         commentsCount,
//       });
//     }

//     res.status(200).json({
//       status: 'success',
//       results: blogsWithCommentsCount.length,
//       data: {
//         blogs: blogsWithCommentsCount,
//       },
//     });
//   }
exports.getBlogWithComments = getBlogWithComments;
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await _models.Blog.findAll();
    res.status(200).send({
      status: "success",
      message: blogs
    });
  } catch (error) {
    res.status(404).send({
      status: "fail",
      message: `failed to get blogs ${error}`
    });
    console.log(error);
  }
};
exports.getAllBlogs = getAllBlogs;
const getBlogById = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await _models.Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).send({
        status: 'fail',
        message: 'blog not found'
      });
    }
    res.status(200).send({
      status: 'success',
      message: blog
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal server error'
    });
  }
};
exports.getBlogById = getBlogById;
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await _models.Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).send({
        status: "fail",
        message: "blog not found"
      });
    }
    await blog.destroy();
    res.status(200).send({
      status: "success",
      message: "blog deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      message: "Failed to delete blog"
    });
  }
};
exports.deleteBlog = deleteBlog;