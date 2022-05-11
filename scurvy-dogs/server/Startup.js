import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { json } from 'body-parser'
import { RegisterControllers, Paths, RegisterSocketHandlers } from '../Setup'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from './utils/Logger'
import { AccountValidator } from './utils/AccountValidator'

export class Startup {
  static ConfigureGlobalMiddleware(app) {
    // NOTE Configure and Register Middleware
    Startup.configureCors(app)
    app.use(helmet({
      contentSecurityPolicy: false
    }))
    app.use(json({ limit: '50mb' }))

    // NOTE Configures auth0 middleware that is used throughout controllers
    Auth0Provider.configure({
      domain: process.env.AUTH_DOMAIN,
      clientId: process.env.AUTH_CLIENT_ID,
      audience: process.env.AUTH_AUDIENCE
    })
  }

  static configureCors(app) {
    const allowedDomains = []
    const corsOptions = {
      origin(origin, callback) {
        if (process.env.NODE_ENV === 'dev') {
          return callback(null, true)
        }
        const originIsWhitelisted = allowedDomains.indexOf(origin) !== -1
        callback(null, originIsWhitelisted)
      },
      credentials: true
    }

    app.use(cors(corsOptions))
  }

  static ConfigureRoutes(app) {
    const router = express.Router()
    app.use(AccountValidator)
    RegisterControllers(router)
    RegisterSocketHandlers()
    app.use(router)

    app.use('', express.static(Paths.Public))

    Startup.registerErrorHandlers(app)
  }

  static registerErrorHandlers(app) {
    // NOTE SEND JSON 404 for any unknown routes
    app.use('/api', (_, res, next) => {
      res.status(404).send({ status: 404, message: 'Not Found' })
    })

    // NOTE SEND HTML 404 for any unknown routes
    app.use(
      '*',
      (_, res, next) => {
        res.status(404)
        next()
      },
      express.static(Paths.Public + '404')
    )
    // NOTE Default Error Handler
    app.use((error, req, res, next) => {
      if (!error.status) {
        error.status = 400
      }
      if (error.status === 500) {
        logger.error(error)
      }
      res.status(error.status).send({ error: { message: error.toString(), status: error.status }, url: req.url })
    })
  }
}
