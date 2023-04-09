import { Router } from 'express'
import { UserController } from '@import/controllers'

const router = Router()

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUserById)
router.post('/', UserController.createUser)
router.get('/:id/level/:level', UserController.getLevelFriends)

export default router
