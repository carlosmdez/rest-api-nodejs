const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { validateFields, validateFile } = require('../middlewares/validation')
const {
  uploadFile,
  updateImage,
  showImage,
  updateImageCloudinary,
} = require('../controllers/uploads')
const { collectionsValidator } = require('../helpers/validators')

const allowList = ['users', 'products']

router.post('/', [validateFile], uploadFile)

router.put(
  '/:collection/:id',
  [
    validateFile,
    check('id', 'Not a valid ID').isMongoId(),
    check('collection').custom(c => collectionsValidator(c, allowList)),
    validateFields,
  ],
  updateImageCloudinary
)

router.get(
  '/:collection/:id',
  [
    check('id', 'Not a valid ID').isMongoId(),
    check('collection').custom(c => collectionsValidator(c, allowList)),
    validateFields,
  ],
  showImage
)

module.exports = router
