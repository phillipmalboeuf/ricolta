
const compression = require('compression')
const express = require('express')

import * as ReactDOM from 'react-dom/server'
import * as React from 'react'
import { StaticRouter } from 'react-router-dom'

import { Routes } from '../app/routes'
import { PiecesContext } from '../app/contexts/pieces'
import Piece from '../app/models/piece'

const server = express()

server.use(compression())
server.use('/dist', express.static(`${__dirname}`))

server.get('/*', (req, res) => {
  Piece.list().then(pieces =>
    res.send(ReactDOM.renderToString(
      <PiecesContext.Provider value={{
          pieces
        }}>
        <html>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
          <title>Ricolta</title>
          <link rel='stylesheet' type='text/css' href='/dist/app.css' />
        </head>
        <body>
          <section className='app' id='app'>
            <StaticRouter location={req.originalUrl} context={{}}>
              <Routes />
            </StaticRouter>
          </section>
          
          <script src='/dist/app.js'></script>
        </body>
        </html>
      </PiecesContext.Provider>
    ))
  )
})


const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});