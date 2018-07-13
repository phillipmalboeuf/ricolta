
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import * as bodyparser from 'body-parser'
import cookieparser from 'cookie-parser'
import createLocaleMiddleware from 'express-locale'


import * as ReactDOM from 'react-dom/server'
import * as React from 'react'

import { CONF } from '../config'

import { Routes } from '../app/routes'
import { HTML } from '../app/components/html'
import { sendError } from './helpers/errors'

import User from './models/user'
import Session from './models/session'
import Piece from './models/piece'



interface Server extends Application {}

export const server: Server = express()
server.use(cors({origin: CONF('ORIGIN').split(','), credentials: true}))
server.use(bodyparser.json())
server.use(cookieparser())
server.use(compression())
server.use(createLocaleMiddleware({
  'priority': ['cookie', 'accept-language', 'default'],
  'default': 'fr_CA'
}))
server.use(morgan('dev'))
server.use('/dist', express.static(`${__dirname}`))

const models = [
  User,
  Session,
  Piece
]

models.forEach(model => {
  model.endpoints().forEach(endpoint => server[endpoint.method.toLowerCase()](
    `${endpoint.endpoint}`,
    (req: Request, res: Response) => {
      try {
        endpoint.function(req)
          .then((response: any)=> res.json(response))
          .catch(error => sendError(res, error))
      } catch (error) {
        sendError(res, error)
      }
    }
  ))
})

server.get('/*', (req: Request, res: Response) => {
  Promise.all([
    Piece.list({}, undefined, undefined, undefined, req.locale)
  ]).then(([pieces, user])=> {
    res.send(ReactDOM.renderToString(
      <HTML pieces={pieces}>
        <Routes host={req.hostname} />
      </HTML>
    ))
  })
})

// server.use((req: Request, res: Response) => {
//   res.header('Content-Language', req.locale.language)
// })


const port = CONF('SERVER_PORT')
server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})