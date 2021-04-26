import express from 'express'

export default () => {
  const router = express.Router()
  router.post('/', async (req, res) => {
    const { body: { git: repository } } = req

    res.status(200).send({ info: `Benchmarking ${repository}...` })
    return true
  })

  return router
}
