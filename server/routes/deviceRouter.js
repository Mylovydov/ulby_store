const Router = require('express')
const router = new Router()
const { createDevice, getAllDevices, getOneDevice } = require('../controllers/deviceController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), createDevice)
router.get('/', getAllDevices)
router.get('/:id', getOneDevice)

module.exports = router