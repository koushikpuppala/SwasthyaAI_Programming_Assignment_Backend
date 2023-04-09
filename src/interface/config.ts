import { ConnectOptions } from 'mongoose'

export interface Config {
	hostname: string
	port: number
	secret: string
	whitelist: string[]
	mongodb: {
		uri: string
		options: ConnectOptions
	}
}
