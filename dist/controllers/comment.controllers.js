"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComment = void 0;
var _models = require("../../models");
const createComment = async (req, res) => {
  try {
    const {
      username,
      email,
      blogId
    } = req.body;

    // find the user by their id and select only the necessary attributes
    const user = await _models.User.findOne({
      where: {
        id: req.params.userId
      },
      attributes: ['id', 'username', 'email']
    });

    // find the blog by its id
    const blog = await _models.Blog.findOne({
      where: {
        id: req.params.blogId
      },
      attributes: ['id']
    });

    // create the comment and associate it with the user and blog
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