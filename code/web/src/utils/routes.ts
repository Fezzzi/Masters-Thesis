import { createRouter } from 'router5'
import browserPlugin from 'router5-plugin-browser'

import { API } from 'shared/constants'

export enum RouteNames {
  browse = 'browse',
  benchmark = 'benchmark',
}

const routes = [
  {
    name: RouteNames.browse,
    path: `/${API.BROWSE}`,
  },
  {
    name: RouteNames.benchmark,
    path: `/${API.BENCHMARK}`,
  },
]

export const router = createRouter(routes, { defaultRoute: RouteNames.browse })

router.usePlugin(browserPlugin())
router.start()
