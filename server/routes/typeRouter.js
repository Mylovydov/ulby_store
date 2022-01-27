const Router = require('express')
const router = new Router()
const { createType, getAllTypes } = require('../controllers/typeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), createType)
router.get('/', getAllTypes)

module.exports = router