import React, { useMemo } from 'react'
import { useRoute } from 'react-router5'

import { RouteNames } from 'webSrc/utils/routes'

import { BrowsePage } from './BrowsePage'
import { BenchmarkPage } from './BenchmarkPage'

export const Router = () => {
  const { route } = useRoute()
  const routeName = useMemo(() => route.name, [route])

  switch (routeName) {
    case RouteNames.benchmark:
      return <BenchmarkPage />
    case RouteNames.browse:
      return <BrowsePage />
    default:
      return null
  }
}
