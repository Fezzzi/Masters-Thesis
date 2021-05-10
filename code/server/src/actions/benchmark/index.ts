import express from 'express'
import { spawn } from 'child_process'
import dotenv from 'dotenv'
dotenv.config()

export default () => {
  const router = express.Router()
  router.post('/', async (req, res) => {
    const { body: { git: repository, branch } } = req

    if (process.env.DOCKER_ENV) {
      const SCRIPT_PATH = '/src/bin/spawn-computation-container.sh'
      const containerCommand = spawn('sh', [SCRIPT_PATH, `-r ${repository} -b ${branch}`])

      containerCommand.stdout?.on('data', data => console.log('[container]', data.toString()))
      containerCommand.stderr?.on('data', data => console.error('[container]', data.toString()))
      containerCommand.on('exit', code => console.log('[container] Exited with code', code))

      containerCommand.stdout?.pipe(res)
    } else {
      res.status(400).send({ info: 'Docker strategy is available only in docker container' })
    }

    return true
  })

  return router
}
