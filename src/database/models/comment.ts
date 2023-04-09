import { CommentDocument } from '@import/interface'
import { model, Schema } from 'mongoose'

export default model<CommentDocument>(
	'Comment',
	new Schema({
		content: {
			type: String,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		blog: {
			type: Schema.Types.ObjectId,
			ref: 'Blog',
			required: true,
		},
	})
)
