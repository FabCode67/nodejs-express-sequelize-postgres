"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComment = void 0;
var _models = require("../../models");
const createComment = async (req, res) => {
  try {
    const user = await _models.User.findOne({
      where: {
        id: req.params.userId
      },
      attributes: ['id', 'username', 'email']
    });
    const blog = await _models.Blog.findOne({
      where: {
        id: req.params.blogId
      },
      attributes: ['id']
    });
    const comment = await _models.Comment.create({
      username: user.username,
      email: user.email,
      blogId: blog.id,
      userId: user.id,
      comment: req.body.comment
    });
    res.status(201).json({
      status: "success",
      message: "Comment created successfully",
      data: comment
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Could not create comment"
    });
  }
};
exports.createComment = createComment;