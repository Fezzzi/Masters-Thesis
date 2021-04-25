import React from 'react'

import { API } from 'shared/constants'
import { apiClient } from 'webSrc/apiClient'

export const BenchmarkPage = () => (
  <>
    <h2>BenchmarkPage</h2>

    <button onClick={() => apiClient.post(API.BENCHMARK)}> BENCHMARK </button>
  </>
)
