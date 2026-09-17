import { Router } from 'express'
import { Workout } from '../models/Workout.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Workout.find().sort({ level: 1, title: 1 }).lean())
})

export default router