const ApiError = require("../error/ApiError");
const { User, Basket } = require("../models/models");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (id, email, role) => {
    return jwt.sign(
        { id, email, role }, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {

    async registration (request, response, next) {
        const { email, password, role } = request.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }

        const candidate = await User.findOne({ where: {email} })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({email, role, password: hashPassword})
        const backet = await Basket.create({userId: user.id})

        const token = generateToken(user.id, user.email, user.role)

        return response.json({token})
    }

    async login (request, response, next) {
        const { email, password } = request.body

        const user = await User.findOne({ where: {email} })
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'))
        }

        const token = generateToken(user.id, user.email, user.role)

        return response.json({token})
    }

    // Функция, которая будет проверять зарегистрирован ли пользователь (относится к роуту auth)
    async check (request, response, next) {
        const { id, email, role } = request.user
        const token = generateToken(id, email, role)
        response.json({token})
    }
}

module.exports = new UserController()