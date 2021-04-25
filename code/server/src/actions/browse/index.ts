import express from 'express'

export default () => {
  const router = express.Router()
  router.get('/:action', async (req, res) => {
    const { params: { action } } = req

    res.status(200).send({ info: `Browsing action ${action}.` })
    return true
  })

  return router
}
