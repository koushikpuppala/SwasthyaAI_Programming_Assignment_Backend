import { Comment } from '@import/database/models'

interface Friend {
	id: string
	level: number
}

class FriendService {
	async getFriendsByLevel(userId: string, level: number): Promise<Friend[]> {
		return await getFriends(userId, level)
	}
}

// get all friends of a user by level
export async function getFriends(userId: string, level: number): Promise<Friend[]> {
	const friends: Friend[] = []

	// get all comments by user
	const commentsByUser = await Comment.find({ author: userId }).select('blog -_id')

	// get all comments on those blogs by other users
	const commentsOnSameBlogs = await Comment.find({
		blog: { $in: commentsByUser.map((c) => c.blog) },
	})
		.populate('author', 'id')
		.select('author -_id')

	// get all unique friends
	const friendIds = commentsOnSameBlogs.map((c) => c.author.id.toString())

	// remove duplicates and remove the user itself
	const uniqueFriends = Array.from(new Set(friendIds)).filter((id) => id !== userId)

	// first level friends
	for (const friendId of uniqueFriends) {
		friends.push({ id: friendId, level: 1 })
	}

	// higher level friends
	if (level > 1) {
		for (const friendId of uniqueFriends) {
			const higherLevelFriends = await getFriends(friendId, level - 1)
			for (const higherLevelFriend of higherLevelFriends) {
				if (!friends.find((f) => f.id === higherLevelFriend.id)) {
					friends.push(higherLevelFriend)
				}
			}
		}
	}

	return friends
}

export default new FriendService()
