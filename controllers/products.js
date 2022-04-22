const { Product } = require('../models')

const getProducts = async (req, res) => {
  const { limit = 5, skip = 0 } = req.query
  const query = { status: true }
  const [total, products] = await Promise.all([
    Product.count(query),
    Product.find(query)
      .skip(skip)
      .limit(limit)
      .populate('user', 'name')
      .populate('category', 'name'),
  ])

  res.json({ total, products })
}

const getProduct = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name')
  res.json({ ok: true, product })
}

const addProduct = async (req, res) => {
  const { name, price, category, description } = req.body
  const productDB = await Product.findOne({ name: name?.trim()?.toLowerCase() })
  if (productDB) {
    return res
      .status(400)
      .json({ ok: false, message: `Product ${name} already exist` })
  }
  const data = {
    name: name?.trim()?.toLowerCase(),
    user: req.authUser._id,
    price,
    category,
    description: description?.trim(),
  }
  const product = new Product(data)
  await product.save()
  res.status(201).json({ ok: true, product })
}

const updateProduct = async (req, res) => {
  const { name, price, category, description, available } = req.body
  const { id } = req.params
  const data = {
    name: name?.trim()?.toLowerCase(),
    user: req.authUser._id,
    price,
    category,
    description: description?.trim(),
    available,
  }
  await Product.findByIdAndUpdate(id, data)
  res.json({ ok: true, message: 'Product updated successfully.' })
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  await Product.findByIdAndUpdate(id, {
    status: false,
    user: req.authUser._id,
  })
  res.json({ ok: true, message: 'Product deleted successfully.' })
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
}
