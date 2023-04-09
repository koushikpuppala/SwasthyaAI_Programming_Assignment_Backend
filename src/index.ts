import express, { Application, Response, Request } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors, { CorsOptions } from 'cors'
import { config } from '@import/config'
import Database from '@import/database'
import { default as Router } from '@import/routers'

const app: Application = express()
const options: CorsOptions = {
	origin(origin, callback) {
		if (!origin || config.whitelist.indexOf(origin) !== -1) {
			// allow requests with no origin (like mobile apps or curl requests)
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
			console.error(`${origin} is not allowed by CORS`)
		}
	},
	credentials: true,
}

Database.init()

app.set('trust proxy', 1)

	.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
	.use(bodyParser.json()) // support json encoded bodies (as sent by API clients)
	.use(cors(options)) // enable all CORS requests
	.use(cookieParser()) // parse cookies
	.get('/', (req: Request, res: Response) => {
		const { host } = req.headers,
			ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
		console.log(host, `IP: ${ip}`)

		res.send('Backend is Working Fine.')
	})
	.use('/api', Router) // use the router for all requests starting with /api
	.listen(config.port, config.hostname, () => {
		console.log(`Backend running on: http://localhost:${config.port}`)
	})
