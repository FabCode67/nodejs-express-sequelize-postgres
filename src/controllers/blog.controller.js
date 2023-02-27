
import { Blog, Comment } from "../../models";
import cloudinary from "../middlewares/cloudinary"


export const createBlog =   async (req, res)=> {

    const result = await cloudinary.uploader.upload(req.file.path);

  let blog = await Blog.create({
    blogTitle: req.body.blogTitle,
    blogDescription: req.body.blogDescription,
    blogImage: result.secure_url,
  });
    res.status(201).json({
      status: "success",
      message: "Blog created successfully",
      data: blog
    });
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blog not found",
      });
    }

    // Update the blog with the new values
    const result = await cloudinary.uploader.upload(req.file.path);
    const updatedBlog = await blog.update({
      blogTitle: req.body.blogTitle,
      blogDescription: req.body.blogDescription,
      blogImage: result.secure_url,
    });

    res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};



export const getBlogWithComments = async (req, res) => {
  const blogId = req.params.blogId;

  const blog = await Blog.findOne({
    where: { id: blogId },
    include:  Comment,
  });

  if (!blog) {
    return res.status(404).json({
      status: "error",
      message: "Blog not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: blog,
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


export const getAllBlogs = async(req,res)=>{
  try{
    const blogs = await Blog.findAll();
    res.status(200).send({status:"success", message:blogs})
  } catch(error){
    res.status(404).send({status:"fail", message:`failed to get blogs ${error}`})
    console.log(error);
  }
}

export const getBlogById = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).send({ status: 'fail', message: 'blog not found' });
    }
    res.status(200).send({ status: 'success', message: blog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id; 
    const blog = await Blog.findByPk(blogId); 
    if (!blog) {
      return res.status(404).send({ status: "fail", message: "blog not found" });
    }
    await blog.destroy(); 
    res.status(200).send({ status: "success", message: "blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "fail", message: "Failed to delete blog" });
  }
}