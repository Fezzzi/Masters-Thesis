import express from 'express'

export default () => {
  const router = express.Router()
  router.get('/', async (req, res) => {
    res.status(200).send({ info: 'Browsing benchmarks...' })
    return true
  })

  return router
}
