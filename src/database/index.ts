import mongoose from 'mongoose'
import { config } from '@import/config'

export default class Database {
	private static instance: Database

	public static init(): Database {
		if (!Database.instance) {
			Database.instance = new Database()
		}
		return Database.instance
	}
	private constructor() {
		mongoose.set('strictQuery', true)
		mongoose.connect(config.mongodb.uri, config.mongodb.options)
		mongoose.connection.on('connected', () => {
			console.log('MongoDB successfully connected')
		})
		mongoose.connection.on('err', (err) => {
			console.error(`MongoDB has encountered an error: ${err.stack}`)
		})
		mongoose.connection.on('disconnected', () => {
			console.error('MongoDB disconnected')
		})
	}
}
