const Router = require('express')
const router = new Router()
const { createType, getAllTypes } = require('../controllers/typeController')

router.post('/', createType)
router.get('/', getAllTypes)

module.exports = router