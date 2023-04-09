import { Request, Response } from 'express'
import { BlogService, UserService } from '@import/services'

class BlogController {
	async getAllBlogs(req: Request, res: Response): Promise<void> {
		const blogs = await BlogService.getAllBlogs()
		res.json(blogs)
	}

	async getBlogById(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const blog = await BlogService.getBlogById(id)
		!blog ? res.status(404).json({ message: 'Blog not found' }) : res.json(blog)
	}

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
