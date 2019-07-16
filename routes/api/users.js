const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const usersCtrl = require('../../controllers/users');
const blogCtrl = require('../../controllers/blogs')

/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/posts', blogCtrl.getAllPosts);
router.get('/post/:id', blogCtrl.getOnePost);
router.post('/post', blogCtrl.createPost);
router.delete('/post/:id', blogCtrl.deletePost);


/*---------- Protected Routes ----------*/




module.exports = router;