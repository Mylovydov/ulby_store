require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
// Необходимо сказать серверу что файлы нужно раздавать как статику
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// middleware, которые работает с ошибками должен обязательно идти и регистрироваться в самом конце
// Поскольку он идет последним, мы не вызывали функцию next. На нем работа прекращается и мы возвращаем ответ на клиент
app.use(errorHandler)


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on post ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()