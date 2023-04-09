import { Request, Response } from 'express'
import { BlogService, CommentService, UserService } from '@import/services'

class CommentController {
	// Get all comments in the database and return them as a JSON object in the response body of the request to the client application. If there are no comments in the database, return an empty array.
	async getAllComments(req: Request, res: Response): Promise<void> {
		const comments = await CommentService.getAllComments()
		res.json(comments)
	}

	// Get a comment by its ID and return it as a JSON object in the response body of the request to the client application. If the comment is not found, return a 404 status code and a JSON object with a message property.
	async getCommentById(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const comment = await CommentService.getCommentById(id)
		!comment ? res.status(404).json({ message: 'Comment not found' }) : res.json(comment)
	}

	// Create a new comment and return it as a JSON object in the response body of the request to the client application. If the author or blog is not found, return a 400 status code and a JSON object with a message property.
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

	// Get all comments by a blog's ID and return them as a JSON object in the response body of the request to the client application. If the blog is not found, return a 400 status code and a JSON object with a message property.
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

	// Get all comments by an author's ID and return them as a JSON object in the response body of the request to the client application. If the author is not found, return a 400 status code and a JSON object with a message property.
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
