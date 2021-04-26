import React, { useState } from 'react'

import { API } from 'shared/constants'
import { apiClient } from 'webSrc/apiClient'

export const BenchmarkPage = () => {
  const [gitInput, setGitInput] = useState<string>('')

  return (
    <>
      <h2>BenchmarkPage</h2>

      <input name="git" placeholder="git repository" onChange={({ target: { value } }) => setGitInput(value)} />
      <button onClick={() => apiClient.post(API.BENCHMARK, { git: gitInput })}> BENCHMARK </button>
    </>
  )
}
