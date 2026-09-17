import express from 'express'
import { apiBaseUrl, apiPort } from './config/api.js'
import { connectDatabase } from './config/database.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import teamsRouter from './routes/teams.js'
import usersRouter from './routes/users.js'
import workoutsRouter from './routes/workouts.js'

const app = express()

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-backend', apiUrl: apiBaseUrl })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

async function startServer() {
  await connectDatabase()
  app.listen(apiPort, () => {
    console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`)
  })
}

startServer().catch((error) => {
  console.error('Unable to start the API:', error)
  process.exit(1)
})