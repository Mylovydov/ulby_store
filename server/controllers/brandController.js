const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {

    async createBrand (request, response) {
        const { name } = request.body
        const brand = await Brand.create({ name })
        response.json(brand)
    }

    async getAllBrands (request, response) {
        const brands = await Brand.findAll()
        response.json(brands)
    }
}

module.exports = new BrandController()