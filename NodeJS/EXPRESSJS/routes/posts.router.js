const express = require('express');
const postRouter = express.Router()
const postsController = require('../controllers/posts.controller')

postRouter.get('/', postsController.getPost)


module.exports = postRouter