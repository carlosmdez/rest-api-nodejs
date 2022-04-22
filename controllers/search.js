const { User, Category, Product } = require('../models')

const { ObjectId } = require('mongoose').Types

const allowList = ['users', 'categories', 'products', 'roles']

const searchUsers = async (query, res) => {
  const isMongoID = ObjectId.isValid(query)
  if (isMongoID) {
    const user = await User.findById(query)
    if (user) {
      return res.json({ ok: true, users: [user] })
    }
    return res.json({ ok: false, message: `User with ID: ${query} not found` })
  }
  const regex = new RegExp(query, 'i')
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  })
  if (users?.length > 0) {
    return res.json({ ok: true, users })
  }
  return res.json({ ok: false, message: `Users with '${query}' not found` })
}

const searchCategories = async (query, res) => {
  const isMongoID = ObjectId.isValid(query)
  if (isMongoID) {
    const category = await Category.findById(query)
    if (category) {
      return res.json({ ok: true, categories: [category] })
    }
    return res.json({
      ok: false,
      message: `Category with ID: ${query} not found`,
    })
  }
  const regex = new RegExp(query, 'i')
  const categories = await Category.find({
    name: regex,
    status: true,
  })
  if (categories?.length > 0) {
    return res.json({ ok: true, categories })
  }
  return res.json({
    ok: false,
    message: `Categories with '${query}' not found`,
  })
}

const searchProducts = async (query, res) => {
  const isMongoID = ObjectId.isValid(query)
  if (isMongoID) {
    const product = await Product.findById(query).populate('category', 'name')
    if (product) {
      return res.json({ ok: true, products: [product] })
    }
    return res.json({
      ok: false,
      message: `Product with ID: ${query} not found`,
    })
  }
  const regex = new RegExp(query, 'i')
  const products = await Product.find({
    $or: [{ name: regex }, { description: regex }],
    $and: [{ status: true }],
  }).populate('category', 'name')
  if (products?.length > 0) {
    return res.json({ ok: true, products })
  }
  return res.json({
    ok: false,
    message: `Products with '${query}' not found`,
  })
}

const search = (req, res) => {
  const { collection, item } = req.params
  if (!allowList.includes(collection)) {
    return res
      .status(400)
      .json({ ok: false, message: `The allowed collections are: ${allowList}` })
  }
  switch (collection) {
    case 'users':
      searchUsers(item, res)
      break
    case 'categories':
      searchCategories(item, res)
      break
    case 'products':
      searchProducts(item, res)
      break
    default:
      res.status(500).json({
        ok: false,
        message: `Collection not implemented`,
      })
  }
}

module.exports = { search }
