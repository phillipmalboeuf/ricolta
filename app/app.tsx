
import '../styles/styles.scss'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Routes } from './routes'
import { PiecesContext } from './contexts/pieces'

import Piece from './models/piece'
import User from './models/user'



if (process.env.NODE_ENV === 'production') {
  ReactDOM.hydrate(
    <PiecesContext.Provider value={{
      pieces: window.pieces
    }}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </PiecesContext.Provider>,
    document.getElementById('app'))
} else {
  Promise.all([
    Piece.list()
  ]).then(([pieces, user])=> ReactDOM.render(
    <PiecesContext.Provider value={{
      pieces
    }}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </PiecesContext.Provider>,
    document.getElementById('app')))
}

  