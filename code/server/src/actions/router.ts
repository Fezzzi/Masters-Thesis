import express from 'express'
import path from 'path'

import { API } from 'shared/constants'

import browseRouter from './browse'
import benchmarkRouter from './benchmark'

export default () => {
  const router = express.Router()

  router.all(/.*/, (req, res, next) => {
    if (req.xhr) {
      next()
    } else {
      res.status(200).sendFile(path.resolve('./dist/index.html'))
    }
  })

  const apiRouter = express.Router()

  apiRouter.use(`/${API.BROWSE}`, browseRouter())
  apiRouter.use(`/${API.BENCHMARK}`, benchmarkRouter())

  apiRouter.all(/.*/, (_req, res) => {
    res.status(404).send('Not Found')
  })

  router.use('/api', apiRouter)

  return router
}
