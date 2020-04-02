const User = require('../models/User')
const Post = require('../models/Post')

module.exports = {
  async index(req, res) {
    const { userId } = req

    const user = await User.findByPk(userId, {
      include: { association: 'posts' }
    })

    return res.json(user.posts)
  },

  async listAll(req, res) {
    const { page = 1 } = req.query

    const posts = await Post.findAndCountAll({
      limit: 5,
      offset: (page - 1) * 5,
      include: { association: 'user', attributes: ['username'] }
    })
    res.header('X-Total-Count', posts.count)

    return res.json(posts.rows)
  },

  async create(req, res) {
    const userId = req.userId
    const { postText } = req.body

    const user = await User.findByPk(userId)

    if (!user)
      return res.status(400).send({ error: 'User not found' })

    const post = await Post.create({ postText, userId })

    return res.json(post)
  },

  async delete(req, res) {
    const { userId } = req
    const { postId } = req.params

    const user = await User.findByPk(userId)

    if (!user)
      return res.status(400).json({ error: 'User not found' })

    await Post.destroy({ where: { id: postId } })

    return res.json()
  }
}