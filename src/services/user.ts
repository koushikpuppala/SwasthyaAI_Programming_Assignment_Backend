import { User } from '@import/database/models'
import { UserDocument } from '@import/interface'

class UserService {
	async getAllUsers(): Promise<UserDocument[]> {
		return await User.find()
	}

	async getUserById(id: string): Promise<UserDocument | null> {
		return await User.findById(id)
	}

	async createUser(name: string, email: string, password: string): Promise<UserDocument> {
		return await User.create({ name, email, password })
	}

	async addCommentToUser(userId: string, commentId: string): Promise<void> {
		await User.findByIdAndUpdate(userId, {
			$push: {
				comments: commentId,
			},
		})
	}

	async addBlogToUser(userId: string, blogId: string): Promise<void> {
		await User.findByIdAndUpdate(userId, {
			$push: {
				blogs: blogId,
			},
		})
	}
}

export default new UserService()
