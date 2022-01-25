const Router = require('express')
const router = new Router()
const { createBrand, getAllBrands } = require('../controllers/brandController')

router.post('/', createBrand)
router.get('/', getAllBrands)

module.exports = router