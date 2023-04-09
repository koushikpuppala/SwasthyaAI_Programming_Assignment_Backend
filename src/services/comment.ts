import { Comment } from '@import/database/models'
import { CommentDocument } from '@import/interface'

class CommentService {
	// Get all comments in the database and return them as a JSON object in the response body of the request to the client application. If there are no comments in the database, return an empty array.
	async getAllComments(): Promise<CommentDocument[]> {
		return await Comment.find().populate('author').populate('blog')
	}

	// Get a comment by its ID and return it as a JSON object in the response body of the request to the client application. If the comment is not found, return a 404 status code and a JSON object with a message property.
	async getCommentById(id: string): Promise<CommentDocument | null> {
		return await Comment.findById(id).populate('author').populate('blog')
	}

	// Get all comments by a blog's ID and return them as a JSON object in the response body of the request to the client application. If the blog is not found, return a 400 status code and a JSON object with a message property.
	async getCommentsByBlogId(blogId: string): Promise<CommentDocument[]> {
		return await Comment.find({ blog: blogId }).populate('author').populate('blog')
	}

	// Create a new comment and return it as a JSON object in the response body of the request to the client application. If the author or blog is not found, return a 400 status code and a JSON object with a message property.
	async createComment(
		content: string,
		authorId: string,
		blogId: string
	): Promise<CommentDocument> {
		return await Comment.create({ content, author: authorId, blog: blogId })
	}

	// Get all comments by an author's ID and return them as a JSON object in the response body of the request to the client application. If the author is not found, return a 400 status code and a JSON object with a message property.
	async getCommentsByAuthorId(authorId: string): Promise<CommentDocument[]> {
		return await Comment.find({ author: authorId }).populate('author').populate('blog')
	}
}

export default new CommentService()
