const { Category } = require('../../mongodb/models/Category.js')

module.exports = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find({})
      res.json({ message: 'categoría', data: categories })
    } catch (error) {
      res.json({ error: error.message })
    }
  },
}
