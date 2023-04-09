import { Blog } from '@import/database/models'
import { BlogDocument } from '@import/interface'

class BlogService {
	async getAllBlogs(): Promise<BlogDocument[]> {
		return await Blog.find().populate('author')
	}

	async getBlogById(id: string): Promise<BlogDocument | null> {
		return await Blog.findById(id).populate('author').populate('comments')
	}

	async createBlog(title: string, content: string, authorId: string): Promise<BlogDocument> {
		return await Blog.create({ title, content, author: authorId })
	}

	async addCommentToBlog(blogId: string, commentId: string): Promise<void> {
		await Blog.findByIdAndUpdate(blogId, {
			$push: {
				comments: commentId,
			},
		})
	}

	async getBlogsByAuthorId(authorId: string): Promise<BlogDocument[]> {
		return await Blog.find({ author: authorId }).populate('author').populate('comments')
	}
}

export default new BlogService()
