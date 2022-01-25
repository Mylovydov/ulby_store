const Router = require('express')
const router = new Router()
const { createDevice, getAllDevices, getOneDevice } = require('../controllers/deviceController')

router.post('/', createDevice)
router.get('/', getAllDevices)
router.get('/:id', getOneDevice)

module.exports = router