import { Request, Response } from 'express'
import { UserService, FriendService } from '@import/services'

class UserController {
	async getAllUsers(req: Request, res: Response): Promise<void> {
		const users = await UserService.getAllUsers()
		res.json(users)
	}

	async getUserById(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const user = await UserService.getUserById(id)
		!user ? res.status(404).json({ message: 'User not found' }) : res.json(user)
	}

	async createUser(req: Request, res: Response): Promise<void> {
		const { name, email, password } = req.body
		const user = await UserService.createUser(name, email, password)
		res.json(user)
	}

	async getLevelFriends(req: Request, res: Response): Promise<void> {
		const { id, level } = req.params
		const user = await UserService.getUserById(id)
		if (!user) {
			res.status(404).json({ message: 'User not found' })
		} else {
			const friends = await FriendService.getNthLevelFriends(user, parseInt(level))
			res.json(friends)
		}
	}
}

export default new UserController()
