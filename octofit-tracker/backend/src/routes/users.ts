import { Router } from 'express'
import { User } from '../models/User.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await User.find().select('-password').sort({ name: 1 }).lean())
})

export default router