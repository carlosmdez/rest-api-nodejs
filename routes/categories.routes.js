const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { validateFields, isAdminRole } = require('../middlewares/validation')
const { validateJWT } = require('../helpers/jwt')
const { categoryValidator } = require('../helpers/validators')

const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories')

// Get all categories (public) (paginate, total, populate)
router.get('/', getCategories)

// Get a category by ID (public) (populate)
router.get(
  '/:id',
  [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(categoryValidator),
    validateFields,
  ],
  getCategory
)

// Create a category (any user with valid token)
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name field is required').not().isEmpty(),
    validateFields,
  ],
  addCategory
)

// Update a category (any user with valid token)
router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(categoryValidator),
    check('name', 'Name field is required').not().isEmpty(),
    validateFields,
  ],
  updateCategory
)

// Delete a category (admin users) (state: false)
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(categoryValidator),
    validateFields,
  ],
  deleteCategory
)

module.exports = router
