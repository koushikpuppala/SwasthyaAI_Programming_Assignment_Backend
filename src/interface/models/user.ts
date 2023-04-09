import { Document, Types } from 'mongoose'

export interface UserDocument extends Document {
	name: string
	email: string
	password: string
	blogs: Types.ObjectId[]
	comments: Types.ObjectId[]
}
