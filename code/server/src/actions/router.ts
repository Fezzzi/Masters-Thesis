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

  router.use(`/${API.BROWSE}`, browseRouter())
  router.use(`/${API.BENCHMARK}`, benchmarkRouter())

  router.all(/.*/, (_req, res) => {
    res.status(404).send('Not Found')
  })

  return router
}
