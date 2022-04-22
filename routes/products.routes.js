const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { validateFields, isAdminRole } = require('../middlewares/validation')
const { validateJWT } = require('../helpers/jwt')
const { productValidator, categoryValidator } = require('../helpers/validators')

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products')

// Get all products (public) (paginate, total, populate)
router.get('/', getProducts)

// Get a product by ID (public) (populate)
router.get(
  '/:id',
  [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(productValidator),
    validateFields,
  ],
  getProduct
)

// Create a product (any user with valid token)
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name field is required').not().isEmpty(),
    check('category', 'Not a valid category ID').isMongoId(),
    check('category').custom(categoryValidator),
    validateFields,
  ],
  addProduct
)

// Update a product (any user with valid token)
router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(productValidator),
    // check('name', 'Name field is required').not().isEmpty(),
    check('category', 'Not a valid category ID').isMongoId(),
    check('category').custom(categoryValidator),
    validateFields,
  ],
  updateProduct
)

// Delete a product (admin users) (state: false)
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(productValidator),
    validateFields,
  ],
  deleteProduct
)

module.exports = router
