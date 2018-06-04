
import '../styles/styles.scss'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Routes } from './routes'
import { PiecesContext } from './contexts/pieces'

import Piece from './models/piece'
import User from './models/user'


Promise.all([
  Piece.list()
]).then(([pieces, user])=> {
  const element = document.getElementById('app')
  const app = (
    <PiecesContext.Provider value={{
      pieces
    }}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </PiecesContext.Provider>
  )

  if (process.env.NODE_ENV === 'production') {
    ReactDOM.hydrate(app, element)
  } else {
    ReactDOM.render(app, element)
  }
})

  