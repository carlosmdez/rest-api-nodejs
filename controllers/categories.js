const { Category, User } = require('../models')

const getCategories = async (req, res) => {
  const { limit = 5, skip = 0 } = req.query
  const query = { status: true }
  const [total, categories] = await Promise.all([
    Category.count(query),
    Category.find(query).skip(skip).limit(limit).populate('user', 'name'),
  ])

  res.json({ total, categories })
}

const getCategory = async (req, res) => {
  const { id } = req.params
  const category = await Category.findById(id).populate('user', 'name')
  res.json({ ok: true, category })
}

const addCategory = async (req, res) => {
  const name = req.body.name.toLowerCase()
  const categoryDb = await Category.findOne({ name })
  if (categoryDb) {
    return res
      .status(400)
      .json({ ok: false, message: `Category ${name} already exist` })
  }
  const category = new Category({ name, user: req.authUser._id })
  await category.save()
  res.status(201).json({ ok: true, category: { name } })
}

const updateCategory = async (req, res) => {
  const name = req.body.name.trim().toLowerCase()
  const { id } = req.params
  await Category.findByIdAndUpdate(id, { name, user: req.authUser._id })
  res.json({ ok: true, message: 'Updated successfully.' })
}

const deleteCategory = async (req, res) => {
  const { id } = req.params
  await Category.findByIdAndUpdate(id, {
    status: false,
    user: req.authUser._id,
  })
  res.json({ ok: true, message: 'Deleted successfully.' })
}

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
}
