import { Router } from 'express'
import { default as BlogRouter } from './blog'
import { default as CommentRouter } from './comment'
import { default as UserRouter } from './user'

const router = Router()

router.use('/blog', BlogRouter)
router.use('/comment', CommentRouter)
router.use('/user', UserRouter)

export default router
