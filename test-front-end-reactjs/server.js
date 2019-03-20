const express = require('express')
const app = express()
const cors = require('cors')

const bodyParser = require('body-parser')
require('dotenv').load()
const port = process.env.PORT || 9000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


let routes = require('./api/routes')
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('RESTful API server started on: ' + port)
