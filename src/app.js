const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routers = require('./routers')
const { restore } = require('./database/index')
const port = process.env.PORT || 3000

restore()

const app = express()

app.use(bodyParser.json())

app.use(cors())

app.use(routers)

app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`)
})
