import { Router } from 'express'
import { Activity } from '../models/Activity.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'name').populate('team', 'name').sort({ completedAt: -1 }).lean())
})

export default router