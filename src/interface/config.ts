import { ConnectOptions } from 'mongoose'

export interface Config {
	hostname: string
	port: number
	whitelist: string[]
	mongodb: {
		uri: string
		options: ConnectOptions
	}
}
