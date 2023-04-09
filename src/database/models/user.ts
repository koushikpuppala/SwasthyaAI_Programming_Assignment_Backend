import { UserDocument } from '@import/interface'
import { model, Schema } from 'mongoose'

export default model<UserDocument>(
	'User',
	new Schema({
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		blogs: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Blog',
			},
		],
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	})
)
