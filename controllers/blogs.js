const Blog = require('../models/blog');

module.exports = {
    getAllPosts,
    getOnePost,
    createPost,
    deletePost
  };
  
  function deletePost(req, res) {
    Blog.findByIdAndRemove(req.params.id).then(function(blog) {
      res.status(200).json(blog);
    });
  }
  
  function getOnePost(req, res) {
    Blog.findById(req.params.id).then(function(post) {
      res.status(200).json(post);
    });
  }
  
  function createPost(req, res) {
    Blog.create(req.body).then(function(post) {
      res.status(201).json(post);
    });
  }
  
  function getAllPosts(req, res) {
    Blog.find({}).then(function(posts) {
      console.log(posts)
      res.status(200).json(posts);
    });
  }