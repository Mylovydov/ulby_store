const Router = require('express')
const router = new Router()
const { createBrand, getAllBrands } = require('../controllers/brandController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), createBrand)
router.get('/', getAllBrands)

module.exports = router