import React, { useEffect, useState } from 'react'

import { API } from 'shared/constants'
import { apiClient } from 'webSrc/apiClient'

export const BrowsePage = () => {
  const [data, setData] = useState<null | string>(null)

  useEffect(() => {
    console.log('Browse data')
    apiClient.get(API.BROWSE)
      .then(({ data }) => setData(data))
  }, [])

  return (
    <>
      <h2>Browse Page</h2>

      <h3>Data:</h3>
      {JSON.stringify(data)}
    </>
  )
}
