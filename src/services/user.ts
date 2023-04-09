import { User } from '@import/database/models'
import { UserDocument } from '@import/interface'

class UserService {
	// Get all users in the database and return them as a JSON object in the response body of the request to the client application. If there are no users in the database, return an empty array.
	async getAllUsers(): Promise<UserDocument[]> {
		return await User.find()
	}

	// Get a user by its ID and return it as a JSON object in the response body of the request to the client application. If the user is not found, return a 404 status code and a JSON object with a message property.
	async getUserById(id: string): Promise<UserDocument | null> {
		return await User.findById(id)
	}

	// Create a new user and return it as a JSON object in the response body of the request to the client application.
	async createUser(name: string, email: string, password: string): Promise<UserDocument> {
		return await User.create({ name, email, password })
	}

	// Add a comment to a user's comments array
	async addCommentToUser(userId: string, commentId: string): Promise<void> {
		await User.findByIdAndUpdate(userId, {
			$push: {
				comments: commentId,
			},
		})
	}

	// Add a blog to a user's blogs array
	async addBlogToUser(userId: string, blogId: string): Promise<void> {
		await User.findByIdAndUpdate(userId, {
			$push: {
				blogs: blogId,
			},
		})
	}
}

export default new UserService()
