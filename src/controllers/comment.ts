import { Request, Response } from 'express'
import { BlogService, CommentService, UserService } from '@import/services'

class CommentController {
	async getAllComments(req: Request, res: Response): Promise<void> {
		const comments = await CommentService.getAllComments()
		res.json(comments)
	}

	async getCommentById(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const comment = await CommentService.getCommentById(id)
		!comment ? res.status(404).json({ message: 'Comment not found' }) : res.json(comment)
	}

	async createComment(req: Request, res: Response): Promise<void> {
		const { content, authorId, blogId } = req.body
		const author = await UserService.getUserById(authorId)
		const blog = await BlogService.getBlogById(blogId)
		if (!author) {
			res.status(400).json({ message: 'Author not found' })
		} else if (!blog) {
			res.status(400).json({ message: 'Blog not found' })
		} else {
			const comment = await CommentService.createComment(content, authorId, blogId)
			await UserService.addCommentToUser(authorId, comment._id)
			await BlogService.addCommentToBlog(blogId, comment._id)
			res.json(comment)
		}
	}

	async getCommentsByBlogId(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const blog = await BlogService.getBlogById(id)
		if (!blog) {
			res.status(400).json({ message: 'Blog not found' })
		} else {
			const comments = await CommentService.getCommentsByBlogId(id)
			res.json(comments)
		}
	}

	async getCommentsByAuthorId(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const author = await UserService.getUserById(id)
		if (!author) {
			res.status(400).json({ message: 'Author not found' })
		} else {
			const comments = await CommentService.getCommentsByAuthorId(id)
			res.json(comments)
		}
	}
}

export default new CommentController()
