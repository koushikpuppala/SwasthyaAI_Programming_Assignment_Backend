import { Router } from 'express'
import { CommentController } from '@import/controllers'

const router = Router()

router.get('/', CommentController.getAllComments)
router.get('/:id', CommentController.getCommentById)
router.post('/', CommentController.createComment)
router.get('/blog/:id', CommentController.getCommentsByBlogId)
router.get('/author/:id', CommentController.getCommentsByAuthorId)

export default router
