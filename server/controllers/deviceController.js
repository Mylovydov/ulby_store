const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {

    async createDevice (request, response, next) {
        try {
            let { name, price, brandId, typeId, info } = request.body
            // Картинка лежит в поле files
            const { img } = request.files
            // генерим имя, чтобы потом его можно было искать
            const fileName = uuid.v4() + '.jpg'
            // перемещаем
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            // ID присваивается после создания, поэтому перенесем до условия
            const device = await Device.create({ name, price, brandId, typeId, img: fileName })

            if (info) {
                console.log(info);
                console.log(JSON.parse(info));
                // Если данные передаются через FormData, то данные приходят в виде строки
                // На фронте мы будем перегонять массив в JSON строку, а на бэке обратно в JS объекты
                info = JSON.parse(info)
                // После пробегаемся и для каждого элкмента массива создаем объект в БД
                info.forEach(el => {
                    DeviceInfo.create({
                        title: el.title,
                        description: el.description,
                        deviceId: device.id
                    })
                });
            }

            return response.json(device)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAllDevices (request, response) {
        // Параметры brandId, typeId будем получать из строки запроса
        let { brandId, typeId, limit, page } = request.query

        page = page || 1
        limit = limit || 9

        // Поссчитаем отступ
        let offset = page * limit - limit

        let devices
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }

        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }

        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }

        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{brandId, typeId}, limit, offset})
        }

        return response.json(devices)
    }

    async getOneDevice (request, response) {
        const { id } = request.params
        const device = await Device.findOne(
            {
                where: { id },
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )
        return response.json(device)
    }
}

module.exports = new DeviceController()