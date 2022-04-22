const path = require('path')
const fs = require('fs')

const { uploadHandler } = require('../helpers/upload-files')
const { User, Product } = require('../models')

const uploadFile = async (req, res) => {
  const { files } = req
  try {
    const filePath = await uploadHandler(files)
    return res.json({ ok: true, name: filePath })
  } catch (error) {
    res.status(500).json({ ok: false, message: error })
  }
}

const updateImage = async (req, res) => {
  const { collection, id } = req.params
  let model = null
  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if (!model)
        return res.status(400).json({ ok: false, message: 'User not found.' })
      break
    case 'products':
      model = await Product.findById(id)
      if (!model)
        return res
          .status(400)
          .json({ ok: false, message: 'Product not found.' })
      break
    default:
      return res.status(500).json({
        ok: false,
        message: `Collection not implemented`,
      })
  }

  // Delete previous image
  if (model.img) {
    const imgPath = path.join(__dirname, '../uploads/', collection, model.img)
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath)
    }
  }

  try {
    const imgName = await uploadHandler(req.files, undefined, collection)
    model.img = imgName
    model.save()
    return res.json({ ok: true, model })
  } catch (error) {
    res.status(500).json({ ok: false, message: error })
  }
}

const showImage = async (req, res) => {
  const { collection, id } = req.params
  let model = null
  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if (!model)
        return res.status(400).json({ ok: false, message: 'User not found.' })
      break
    case 'products':
      model = await Product.findById(id)
      if (!model)
        return res
          .status(400)
          .json({ ok: false, message: 'Product not found.' })
      break
    default:
      return res.status(500).json({
        ok: false,
        message: `Collection not implemented`,
      })
  }

  if (model.img) {
    const imgPath = path.join(__dirname, '../uploads/', collection, model.img)
    if (fs.existsSync(imgPath)) {
      return res.sendFile(imgPath)
    }
  }
  // const errImg = path.join(__dirname, '../assets/', 'not-found.jpeg')
  // res.sendFile(errImg)
  res.status(500).json({ ok: false, message: 'Image not found' })
}

module.exports = { uploadFile, updateImage, showImage }
