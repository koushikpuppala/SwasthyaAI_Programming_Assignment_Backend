import { Document, Types } from 'mongoose'

export interface BlogDocument extends Document {
	title: string
	content: string
	author: Types.ObjectId
	comments: Types.ObjectId[]
}
