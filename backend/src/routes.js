const express = require('express')

const authMiddleware = require('./middlewares/auth')

const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')

const routes = express.Router()

routes.post('/users/register', UserController.register)
routes.post('/users/authenticate', UserController.authenticate)

routes.get('/post', authMiddleware, PostController.index)
routes.get('/post/all', authMiddleware, PostController.listAll)
routes.post('/post', authMiddleware, PostController.create)
routes.delete('/post/:postId', authMiddleware, PostController.delete)

module.exports = routes