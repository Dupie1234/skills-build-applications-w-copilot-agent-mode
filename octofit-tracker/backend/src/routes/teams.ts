import { Router } from 'express'
import { Team } from '../models/Team.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name email').populate('createdBy', 'name').lean())
})

export default router