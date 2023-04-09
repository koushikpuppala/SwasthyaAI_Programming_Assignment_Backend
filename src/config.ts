import * as dotenv from 'dotenv'
import { Config } from '@import/interface'

dotenv.config({
	path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
})

export const config: Config = {
	hostname: 'localhost',
	port: 8080,
	secret: process.env.JWT_SECRET!,
	whitelist: ['http://127.0.0.1:3000', 'localhost', 'http://localhost:3000'],
	mongodb: {
		uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@testing.fspu0lu.mongodb.net/?retryWrites=true&w=majority`,
		options: {
			connectTimeoutMS: 10000,
			socketTimeoutMS: 45000,
			serverSelectionTimeoutMS: 5000,
			family: 4,
			maxPoolSize: 100,
			minPoolSize: 10,
		},
	},
}
