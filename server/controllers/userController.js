const ApiError = require("../error/ApiError");

class UserController {

    async registration (request, response) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    async login (request, response) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    // Функция, которая будет проверять зарегистрирован ли пользователь (относится к роуту auth)
    async check (request, response, next) {
        try {


            // пример получения query параметров
            const {id} = request.query
            if (!id) {
               return next(ApiError.badRequest('Не задан ID'))
            }
            response.json(id)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserController()