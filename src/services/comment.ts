import { Comment } from '@import/database/models'
import { CommentDocument } from '@import/interface'

class CommentService {
	async getAllComments(): Promise<CommentDocument[]> {
		return await Comment.find().populate('author').populate('blog')
	}

	async getCommentById(id: string): Promise<CommentDocument | null> {
		return await Comment.findById(id).populate('author').populate('blog')
	}

	async getCommentsByBlogId(blogId: string): Promise<CommentDocument[]> {
		return await Comment.find({ blog: blogId }).populate('author').populate('blog')
	}

	async createComment(
		content: string,
		authorId: string,
		blogId: string
	): Promise<CommentDocument> {
		return await Comment.create({ content, author: authorId, blog: blogId })
	}

	async getCommentsByAuthorId(authorId: string): Promise<CommentDocument[]> {
		return await Comment.find({ author: authorId }).populate('author').populate('blog')
	}
}

export default new CommentService()
