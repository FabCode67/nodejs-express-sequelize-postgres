import { Comment, User, Blog } from "../../models";
export const createComment = async (req, res) => {
    try {

      const user = await User.findOne({
        where: { id: req.params.userId },
        attributes: ['id', 'username', 'email']
      });
  
      const blog = await Blog.findOne({
        where: { id: req.params.blogId },
        attributes: ['id']
      });
  
      const comment = await Comment.create({
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
  