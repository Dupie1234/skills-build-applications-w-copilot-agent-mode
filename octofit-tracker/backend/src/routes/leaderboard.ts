import { Router } from 'express'
import { Leaderboard } from '../models/Leaderboard.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user', 'name avatarUrl').populate('team', 'name').sort({ rank: 1 }).lean())
})

export default router