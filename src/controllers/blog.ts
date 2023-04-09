import { Request, Response } from 'express'
import { BlogService, UserService } from '@import/services'

class BlogController {
	// Get all blogs in the database and return them as a JSON object in the response body of the request to the client application. If there are no blogs in the database, return an empty array.
	async getAllBlogs(req: Request, res: Response): Promise<void> {
		const blogs = await BlogService.getAllBlogs()
		res.json(blogs)
	}

	// Get a blog by its ID and return it as a JSON object in the response body of the request to the client application. If the blog is not found, return a 404 status code and a JSON object with a message property.
	async getBlogById(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const blog = await BlogService.getBlogById(id)
		!blog ? res.status(404).json({ message: 'Blog not found' }) : res.json(blog)
	}

	// Create a new blog and return it as a JSON object in the response body of the request to the client application. If the author is not found, return a 400 status code and a JSON object with a message property.
	async createBlog(req: Request, res: Response): Promise<void> {
		const { title, content, authorId } = req.body
		const author = await UserService.getUserById(authorId)
		if (!author) {
			res.status(400).json({ message: 'Author not found' })
		} else {
			const blog = await BlogService.createBlog(title, content, authorId)
			await UserService.addBlogToUser(authorId, blog._id)
			res.json(blog)
		}
	}

	// Get all blogs by an author's ID and return them as a JSON object in the response body of the request to the client application. If the author is not found, return a 400 status code and a JSON object with a message property.
	async getBlogsByAuthorId(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const author = await UserService.getUserById(id)
		if (!author) {
			res.status(400).json({ message: 'Author not found' })
		} else {
			const blogs = await BlogService.getBlogsByAuthorId(id)
			res.json(blogs)
		}
	}
}

export default new BlogController()
