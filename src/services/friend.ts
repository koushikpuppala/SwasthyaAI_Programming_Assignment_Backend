import { User } from '@import/database/models'
import { UserDocument } from '@import/interface'

class FriendService {
	async getNthLevelFriends(user: UserDocument, level: number): Promise<UserDocument[]> {
		let friends: UserDocument[] = []
		if (level === 1) {
			friends = await this.getFirstLevelFriends(user)
		} else {
			const firstLevelFriends = await this.getFirstLevelFriends(user)
			for (const friend of firstLevelFriends) {
				const friendFriends = await this.getNthLevelFriends(friend, level - 1)
				friends = [...friends, ...friendFriends]
			}
			friends = friends.filter((friend) => friend.id === user.id)
			friends = this.removeDuplicates(friends)
		}
		return friends
	}

	private async getFirstLevelFriends(user: UserDocument): Promise<UserDocument[]> {
		const friendIds = user.comments.map((comment) => comment).filter((id) => id !== user.id)
		const friends = await User.find({ _id: { $in: friendIds } })
		return friends
	}

	private removeDuplicates(users: UserDocument[]): UserDocument[] {
		const uniqueFriends: UserDocument[] = []
		const userIds: string[] = []
		for (const user of users) {
			if (!userIds.includes(user.id)) {
				userIds.push(user.id)
				uniqueFriends.push(user)
			}
		}
		return uniqueFriends
	}
}

export default new FriendService()
