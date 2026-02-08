import config from '#config/config.js'
import { middleware } from '#middlewares/middleware.js'
import cors from 'cors'
// import { config } from "dotenv-flow";
import express from 'express'

const app = express()
app.use(cors())
const port = process.env.PORT ?? '9001'

app.get('/', middleware)

app.listen(port, () => {
    console.log('hi node.......................', config.PORT)
    console.log(`Example app listening on port ${port}`)
})
