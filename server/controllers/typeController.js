const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {

    async createType (request, response) {
        const { name } = request.body
        const type = await Type.create({name})
        response.json(type)
    }

    async getAllTypes (request, response) {
        const types = await Type.findAll()
        response.json(types)
    }
}

module.exports = new TypeController()