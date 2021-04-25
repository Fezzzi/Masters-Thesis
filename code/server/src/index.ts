import app from './app'

const PORT: string|number = process.env.API_PORT ?? 8080

// Start the server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}!`)
})
