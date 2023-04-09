import { BlogDocument } from '@import/interface'
import { model, Schema } from 'mongoose'

export default model<BlogDocument>(
	'Blog',
	new Schema({
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	})
)
