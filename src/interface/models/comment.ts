import { Document, Types } from 'mongoose'

export interface CommentDocument extends Document {
	content: string
	author: Types.ObjectId
	blog: Types.ObjectId
}
