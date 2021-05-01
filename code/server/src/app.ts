import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import dotenv from 'dotenv'

import baseRouter from './actions/router'
import { Logger } from './helpers/logger'
import { LOGS } from './constants'

dotenv.config()

// Initialize the server
const app = express()

// Get data from raw HTTP requests and json bodies to request object
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))

// Setup access logging
app.use(morgan(':remote-addr - :remote-user ":method :url" :status :response-time ms', {
  skip: req => req.method === 'OPTIONS',
  stream: {
    write: (str: string) => Logger(LOGS.ACCESS_LOG, str),
  },
}))

// Setup CORS policy
process.env.NODE_ENV !== 'production' && app.use(
  cors({
    origin: `http://localhost:${process.env.DEV_PORT ?? 8081}`,
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

// Serve static assets
app.use(express.static(path.resolve('./dist')))

// Setup routing
app.use(baseRouter())

export default app
