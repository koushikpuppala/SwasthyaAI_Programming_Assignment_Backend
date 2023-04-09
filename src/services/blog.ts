import { Blog } from '@import/database/models'
import { BlogDocument } from '@import/interface'

class BlogService {
	// Get all blogs in the database and return them as a JSON object in the response body of the request to the client application. If there are no blogs in the database, return an empty array.
	async getAllBlogs(): Promise<BlogDocument[]> {
		return await Blog.find().populate('author')
	}

	// Get a blog by its ID and return it as a JSON object in the response body of the request to the client application. If the blog is not found, return a 404 status code and a JSON object with a message property.
	async getBlogById(id: string): Promise<BlogDocument | null> {
		return await Blog.findById(id).populate('author').populate('comments')
	}

	// Create a new blog and return it as a JSON object in the response body of the request to the client application. If the author is not found, return a 400 status code and a JSON object with a message property.
	async createBlog(title: string, content: string, authorId: string): Promise<BlogDocument> {
		return await Blog.create({ title, content, author: authorId })
	}

	// Add a comment to a blog
	async addCommentToBlog(blogId: string, commentId: string): Promise<void> {
		await Blog.findByIdAndUpdate(blogId, {
			$push: {
				comments: commentId,
			},
		})
	}

	// Get all blogs by an author's ID and return them as a JSON object in the response body of the request to the client application. If the author is not found, return a 400 status code and a JSON object with a message property.
	async getBlogsByAuthorId(authorId: string): Promise<BlogDocument[]> {
		return await Blog.find({ author: authorId }).populate('author').populate('comments')
	}
}

export default new BlogService()
