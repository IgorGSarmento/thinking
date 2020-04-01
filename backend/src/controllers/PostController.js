const User = require('../models/User')
const Post = require('../models/Post')

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query

    const posts = await Post.findAndCountAll({
      limit: 5,
      offset: (page - 1) * 5
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
  }
}