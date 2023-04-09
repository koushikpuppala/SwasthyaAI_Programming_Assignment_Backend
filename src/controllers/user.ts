import { Request, Response } from 'express'
import { UserService, FriendService } from '@import/services'

class UserController {
	// Get all users in the database and return them as a JSON object in the response body of the request to the client application. If there are no users in the database, return an empty array.
	async getAllUsers(req: Request, res: Response): Promise<void> {
		const users = await UserService.getAllUsers()
		res.json(users)
	}

	// Get a user by its ID and return it as a JSON object in the response body of the request to the client application. If the user is not found, return a 404 status code and a JSON object with a message property.
	async getUserById(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const user = await UserService.getUserById(id)
		!user ? res.status(404).json({ message: 'User not found' }) : res.json(user)
	}

	// Create a new user and return it as a JSON object in the response body of the request to the client application.
	async createUser(req: Request, res: Response): Promise<void> {
		const { name, email, password } = req.body
		const user = await UserService.createUser(name, email, password)
		res.json(user)
	}

	// Get all friends of a user by their ID and return them as a JSON object in the response body of the request to the client application. If the user is not found, return a 404 status code and a JSON object with a message property.
	async getLevelFriends(req: Request, res: Response): Promise<void> {
		const { id, level } = req.params
		const user = await UserService.getUserById(id)
		if (!user) {
			res.status(404).json({ message: 'User not found' })
		} else {
			const friends = await FriendService.getFriendsByLevel(id, parseInt(level))
			res.json(friends)
		}
	}
}

export default new UserController()
