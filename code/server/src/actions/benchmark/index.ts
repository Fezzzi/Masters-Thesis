import express from 'express'

export default () => {
  const router = express.Router()
  router.post('/', async (req, res) => {
    const { body } = req

    res.status(200).send({ info: `Benchmarking ${body}.` })
    return true
  })

  return router
}
