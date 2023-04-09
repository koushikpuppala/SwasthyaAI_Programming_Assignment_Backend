import { Router } from 'express'
import { BlogController } from '@import/controllers'

const router = Router()

router.get('/', BlogController.getAllBlogs)
router.get('/:id', BlogController.getBlogById)
router.post('/', BlogController.createBlog)
router.get('/author/:id', BlogController.getBlogsByAuthorId)

export default router
